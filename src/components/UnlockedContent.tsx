import { CheckCircle, TrendingUp, Shield, Zap } from "lucide-react";

const UnlockedContent = () => {
  return (
    <div className="min-h-[600px] rounded-2xl border border-border bg-card p-12 animate-unlock">
      <div className="flex items-center gap-3 mb-8">
        <CheckCircle className="w-8 h-8 text-primary" />
        <h2 className="text-4xl font-bold text-foreground">Premium Content Unlocked!</h2>
      </div>

      <div className="space-y-6 text-foreground">
        <p className="text-lg leading-relaxed">
          Welcome to our exclusive premium content! You've successfully unlocked access to advanced Bitcoin Cash insights and strategies.
        </p>

        <div className="p-6 bg-primary/5 rounded-xl border border-primary/20">
          <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-primary" />
            Advanced BCH Transaction Techniques
          </h3>
          <p className="text-base leading-relaxed text-muted-foreground">
            Bitcoin Cash enables fast, reliable, and low-cost transactions. Learn how to optimize your transactions using advanced features like CashTokens, which allow you to create fungible and non-fungible tokens directly on the BCH blockchain.
          </p>
        </div>

        <div className="p-6 bg-primary/5 rounded-xl border border-primary/20">
          <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Zap className="w-6 h-6 text-primary" />
            Smart Contract Development
          </h3>
          <p className="text-base leading-relaxed text-muted-foreground">
            Discover how to build powerful smart contracts using CashScript, a high-level language for Bitcoin Cash. Create decentralized applications with features like atomic swaps, escrow services, and automated payment systems.
          </p>
        </div>

        <div className="p-6 bg-primary/5 rounded-xl border border-primary/20">
          <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            Security Best Practices
          </h3>
          <p className="text-base leading-relaxed text-muted-foreground">
            Implement industry-standard security measures including HD wallet derivation, proper key management, and transaction verification. Learn about the latest security protocols and how to protect your users' funds.
          </p>
        </div>

        <div className="mt-8 p-6 bg-muted rounded-xl">
          <h3 className="text-2xl font-semibold mb-4">Key Takeaways:</h3>
          <ul className="space-y-3 text-base">
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <span>BCH transactions settle in seconds with minimal fees (typically less than $0.01)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <span>CashTokens enable complex DeFi applications without the need for sidechains</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <span>BCH's UTXO model provides superior privacy compared to account-based systems</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <span>Native multi-signature support enables secure collaborative custody solutions</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <span>Growing merchant adoption makes BCH ideal for real-world payment infrastructure</span>
            </li>
          </ul>
        </div>

        <div className="mt-8 p-6 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl border border-primary/30">
          <p className="text-lg font-semibold text-foreground">
            Thank you for supporting our content with Bitcoin Cash! 🚀
          </p>
          <p className="text-muted-foreground mt-2">
            Your micro-payment demonstrates the power of peer-to-peer electronic cash for content monetization.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UnlockedContent;
