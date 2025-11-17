import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coins, RefreshCw, TrendingUp, Clock, CheckCircle, Copy } from "lucide-react";
import { toast } from "sonner";

interface PaymentSession {
  id: string;
  payment_address: string;
  amount: number;
  paid: boolean;
  created_at: string;
  transaction_id: string | null;
}

const Admin = () => {
  const [sessions, setSessions] = useState<PaymentSession[]>([]);
  const [totalReceived, setTotalReceived] = useState(0);
  const [pendingAmount, setPendingAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [merchantAddress, setMerchantAddress] = useState("");

  const fetchSessions = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('payment_sessions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        setSessions(data);
        
        // Get merchant address from first session
        if (data.length > 0) {
          setMerchantAddress(data[0].payment_address);
        }
        
        // Calculate totals
        const paid = data.filter(s => s.paid).reduce((sum, s) => sum + Number(s.amount), 0);
        const pending = data.filter(s => !s.paid).reduce((sum, s) => sum + Number(s.amount), 0);
        
        setTotalReceived(paid);
        setPendingAmount(pending);
      }
    } catch (error) {
      console.error('Error fetching sessions:', error);
      toast.error('Failed to load payment data');
    } finally {
      setIsLoading(false);
    }
  };

  const checkBalance = async () => {
    if (!merchantAddress) return;
    
    toast.info("Checking blockchain balance...");
    
    try {
      const cleanAddress = merchantAddress.replace('bitcoincash:', '');
      const response = await fetch(
        `https://api.blockchair.com/bitcoin-cash/dashboards/address/${cleanAddress}`
      );
      
      if (response.ok) {
        const data = await response.json();
        if (data?.data?.[cleanAddress]) {
          const addressData = data.data[cleanAddress].address;
          const balance = (addressData.balance || 0) / 100000000;
          const received = (addressData.received || 0) / 100000000;
          
          toast.success(`Balance: ${balance} BCH | Total Received: ${received} BCH`);
        }
      }
    } catch (error) {
      console.error('Balance check error:', error);
      toast.error('Failed to check balance');
    }
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(merchantAddress);
    toast.success('Address copied!');
  };

  useEffect(() => {
    fetchSessions();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('payment_sessions_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'payment_sessions',
        },
        () => {
          fetchSessions();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground flex items-center gap-3">
              <Coins className="w-10 h-10 text-primary" />
              Payment Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">Monitor your BCH payments and balance</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={checkBalance} variant="outline" size="lg">
              <TrendingUp className="w-4 h-4 mr-2" />
              Check Balance
            </Button>
            <Button onClick={fetchSessions} variant="outline" size="lg">
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Merchant Address */}
        {merchantAddress && (
          <Card>
            <CardHeader>
              <CardTitle>Your Merchant Address</CardTitle>
              <CardDescription>All payments are sent to this address</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 p-4 bg-muted rounded-lg font-mono text-sm">
                <span className="flex-1 break-all">{merchantAddress}</span>
                <Button onClick={copyAddress} variant="ghost" size="sm">
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Received</CardTitle>
              <CheckCircle className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{totalReceived.toFixed(4)} BCH</div>
              <p className="text-xs text-muted-foreground mt-1">
                ≈ ${(totalReceived * 350).toFixed(2)} USD
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
              <Clock className="w-4 h-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">{pendingAmount.toFixed(4)} BCH</div>
              <p className="text-xs text-muted-foreground mt-1">
                ≈ ${(pendingAmount * 350).toFixed(2)} USD
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Payments</CardTitle>
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{sessions.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {sessions.filter(s => s.paid).length} confirmed
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Payment Sessions Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Payment Sessions</CardTitle>
            <CardDescription>All payment attempts and confirmations</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-12 text-muted-foreground">Loading...</div>
            ) : sessions.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No payments yet. Share your paywall to start receiving payments!
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-4 font-semibold">Date</th>
                      <th className="text-left p-4 font-semibold">Amount</th>
                      <th className="text-left p-4 font-semibold">Status</th>
                      <th className="text-left p-4 font-semibold">Session ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sessions.map((session) => (
                      <tr key={session.id} className="border-b border-border hover:bg-muted/50">
                        <td className="p-4 text-sm">
                          {new Date(session.created_at).toLocaleString()}
                        </td>
                        <td className="p-4">
                          <span className="font-semibold text-primary">
                            {Number(session.amount).toFixed(4)} BCH
                          </span>
                          <span className="text-xs text-muted-foreground ml-2">
                            (≈ ${(Number(session.amount) * 350).toFixed(2)})
                          </span>
                        </td>
                        <td className="p-4">
                          {session.paid ? (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                              <CheckCircle className="w-3 h-3" />
                              Paid
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-600 text-sm font-medium">
                              <Clock className="w-3 h-3" />
                              Pending
                            </span>
                          )}
                        </td>
                        <td className="p-4 font-mono text-xs text-muted-foreground">
                          {session.id.slice(0, 8)}...
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
