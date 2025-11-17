import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Loader2, CheckCircle2, Copy, ExternalLink } from "lucide-react";
import QRDisplay from "./QRDisplay";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentConfirmed: () => void;
  amount: number;
}

const PaymentModal = ({ isOpen, onClose, onPaymentConfirmed, amount }: PaymentModalProps) => {
  const [paymentAddress, setPaymentAddress] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<"pending" | "checking" | "confirmed">("pending");

  useEffect(() => {
    if (isOpen && !paymentAddress) {
      generatePaymentAddress();
    }
  }, [isOpen]);

  useEffect(() => {
    if (paymentAddress && paymentStatus === "pending") {
      const interval = setInterval(() => {
        checkPaymentStatus();
      }, 4000); // Check every 4 seconds

      return () => clearInterval(interval);
    }
  }, [paymentAddress, paymentStatus]);

  const generatePaymentAddress = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-payment-session", {
        body: { amount },
      });

      if (error) throw error;

      setPaymentAddress(data.paymentAddress);
      toast.success("Payment address generated!");
    } catch (error) {
      console.error("Error generating payment address:", error);
      toast.error("Failed to generate payment address");
    } finally {
      setIsLoading(false);
    }
  };

  const checkPaymentStatus = async () => {
    if (!paymentAddress || isChecking) return;

    setIsChecking(true);
    setPaymentStatus("checking");

    try {
      const { data, error } = await supabase.functions.invoke("check-payment", {
        body: { address: paymentAddress },
      });

      if (error) throw error;

      if (data.paid) {
        setPaymentStatus("confirmed");
        toast.success("Payment confirmed! 🎉");
        setTimeout(() => {
          onPaymentConfirmed();
          onClose();
        }, 2000);
      } else {
        setPaymentStatus("pending");
      }
    } catch (error) {
      console.error("Error checking payment:", error);
      setPaymentStatus("pending");
    } finally {
      setIsChecking(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy");
    }
  };

  const openInExplorer = () => {
    window.open(`https://explorer.bitcoin.com/bch/address/${paymentAddress}`, "_blank");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Pay with Bitcoin Cash</DialogTitle>
          <DialogDescription>
            Send exactly {amount} BCH to unlock premium content
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <Loader2 className="w-12 h-12 animate-spin text-primary" />
              <p className="text-muted-foreground">Generating payment address...</p>
            </div>
          ) : paymentStatus === "confirmed" ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <CheckCircle2 className="w-16 h-16 text-primary" />
              <p className="text-xl font-semibold text-foreground">Payment Confirmed!</p>
              <p className="text-muted-foreground">Unlocking content...</p>
            </div>
          ) : (
            <>
              {/* QR Code */}
              <div className="flex justify-center">
                <QRDisplay value={`bitcoincash:${paymentAddress}?amount=${amount}`} />
              </div>

              {/* Amount */}
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">Amount to Send</p>
                <p className="text-3xl font-bold text-primary">{amount} BCH</p>
                <p className="text-xs text-muted-foreground">
                  ≈ ${(amount * 350).toFixed(2)} USD (estimated)
                </p>
              </div>

              {/* Address */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">Payment Address</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 p-3 bg-muted rounded-lg font-mono text-xs break-all">
                    {paymentAddress}
                  </div>
                  <button
                    onClick={() => copyToClipboard(paymentAddress)}
                    className="p-3 hover:bg-muted rounded-lg transition-colors"
                    title="Copy address"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={openInExplorer}
                    className="p-3 hover:bg-muted rounded-lg transition-colors"
                    title="View in explorer"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                {paymentStatus === "checking" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Checking for payment...</span>
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                    <span>Waiting for payment...</span>
                  </>
                )}
              </div>

              {/* Instructions */}
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20 space-y-2">
                <p className="text-sm font-semibold text-foreground">How to Pay:</p>
                <ol className="text-xs text-muted-foreground space-y-1 list-decimal list-inside">
                  <li>Open your BCH wallet (Bitcoin.com, Electron Cash, etc.)</li>
                  <li>Scan the QR code or copy the address above</li>
                  <li>Send exactly {amount} BCH</li>
                  <li>Wait for confirmation (usually &lt; 10 seconds)</li>
                </ol>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
