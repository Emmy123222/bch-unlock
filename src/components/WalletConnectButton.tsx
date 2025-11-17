import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Wallet, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface WalletConnectButtonProps {
  paymentAddress: string;
  amount: number;
}

const WalletConnectButton = ({ paymentAddress, amount }: WalletConnectButtonProps) => {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleWalletPay = () => {
    setIsConnecting(true);
    
    // Create BCH payment URI
    const paymentUri = `bitcoincash:${paymentAddress}?amount=${amount}`;
    
    // Try to open with Bitcoin.com wallet or other BCH wallets
    // This will trigger the wallet app if installed on mobile
    // On desktop, it will prompt to select a wallet app
    window.location.href = paymentUri;
    
    toast.success("Opening your BCH wallet...", {
      description: "Complete the payment in your wallet app",
    });
    
    setTimeout(() => setIsConnecting(false), 3000);
  };

  const openInWallet = (walletType: 'bitcoin.com' | 'electron' | 'paytaca') => {
    let url = '';
    
    switch (walletType) {
      case 'bitcoin.com':
        url = `https://wallet.bitcoin.com/open?uri=bitcoincash:${paymentAddress}?amount=${amount}`;
        break;
      case 'paytaca':
        url = `paytaca://send?address=${paymentAddress}&amount=${amount}`;
        break;
      default:
        url = `bitcoincash:${paymentAddress}?amount=${amount}`;
    }
    
    window.open(url, '_blank');
    toast.info(`Opening ${walletType} wallet...`);
  };

  return (
    <div className="space-y-3">
      <Button
        onClick={handleWalletPay}
        disabled={isConnecting}
        className="w-full bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 text-primary-foreground"
        size="lg"
      >
        <Wallet className="w-5 h-5 mr-2" />
        {isConnecting ? "Opening Wallet..." : "Pay with BCH Wallet"}
      </Button>

      <div className="flex items-center gap-2">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-muted-foreground">Or open in</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => openInWallet('bitcoin.com')}
          className="flex items-center justify-center gap-2 px-3 py-2 text-sm border border-border rounded-lg hover:bg-muted transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          Bitcoin.com
        </button>
        <button
          onClick={() => openInWallet('paytaca')}
          className="flex items-center justify-center gap-2 px-3 py-2 text-sm border border-border rounded-lg hover:bg-muted transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          Paytaca
        </button>
      </div>

      <p className="text-xs text-center text-muted-foreground mt-4">
        No wallet? Get one: <a href="https://wallet.bitcoin.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Bitcoin.com</a> | <a href="https://www.paytaca.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Paytaca</a>
      </p>
    </div>
  );
};

export default WalletConnectButton;
