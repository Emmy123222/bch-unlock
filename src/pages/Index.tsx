import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LockedContent from "@/components/LockedContent";
import UnlockedContent from "@/components/UnlockedContent";
import PaymentModal from "@/components/PaymentModal";
import TestModeToggle from "@/components/TestModeToggle";
import { Button } from "@/components/ui/button";
import { Coins, LayoutDashboard } from "lucide-react";
import heroImage from "@/assets/bch-hero.jpg";

const Index = () => {
  const navigate = useNavigate();
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const paymentAmount = 0.0001; // BCH amount required

  const handleUnlockClick = () => {
    setShowPaymentModal(true);
  };

  const handlePaymentConfirmed = () => {
    setIsUnlocked(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-lg">
                <Coins className="w-6 h-6 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">BCH Paywall</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button
                onClick={() => navigate('/admin')}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Button>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Powered by</span>
                <span className="font-semibold text-primary">Bitcoin Cash</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Hero Image */}
          <div className="relative h-64 rounded-2xl overflow-hidden mb-12">
            <img src={heroImage} alt="Bitcoin Cash Payment Infrastructure" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          </div>

          {/* Hero Section */}
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Bitcoin Cash Paywall Demo
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A simple paywall system powered by Bitcoin Cash for instant micro-payments.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Instant Payments</h3>
              <p className="text-sm text-muted-foreground">
                Transactions confirm in seconds, not minutes. Start reading immediately after payment.
              </p>
            </div>

            <div className="p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Low Fees</h3>
              <p className="text-sm text-muted-foreground">
                Pay fractions of a cent per transaction. Perfect for micro-payments and paywalls.
              </p>
            </div>

            <div className="p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Secure & Private</h3>
              <p className="text-sm text-muted-foreground">
                No signup required. Your payment is all you need to unlock premium content.
              </p>
            </div>
          </div>

          {/* Content Section */}
          {isUnlocked ? (
            <UnlockedContent />
          ) : (
            <LockedContent onUnlock={handleUnlockClick} />
          )}

          {/* Payment Modal */}
          <PaymentModal
            isOpen={showPaymentModal}
            onClose={() => setShowPaymentModal(false)}
            onPaymentConfirmed={handlePaymentConfirmed}
            amount={paymentAmount}
          />
        </div>
      </main>

      {/* Test Mode Toggle */}
      <TestModeToggle />

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 backdrop-blur-sm mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Built with Bitcoin Cash • Demonstrating peer-to-peer electronic cash for the world
            </p>
            <p className="text-xs text-muted-foreground">
              This is a demonstration application. Use Bitcoin Cash testnet for testing.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
