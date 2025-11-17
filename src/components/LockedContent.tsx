import { Lock } from "lucide-react";

interface LockedContentProps {
  onUnlock: () => void;
}

const LockedContent = ({ onUnlock }: LockedContentProps) => {
  return (
    <div className="relative min-h-[600px] rounded-2xl overflow-hidden border border-border bg-card">
      {/* Blurred Content */}
      <div className="absolute inset-0 p-12 blur-[8px] select-none pointer-events-none">
        <h2 className="text-4xl font-bold mb-6 text-foreground">Premium Content</h2>
        <div className="space-y-4 text-muted-foreground">
          <p className="text-lg leading-relaxed">
            Discover exclusive insights and advanced strategies that will transform your understanding of Bitcoin Cash technology...
          </p>
          <p className="text-lg leading-relaxed">
            Learn about the latest developments in peer-to-peer electronic cash systems, scalability solutions, and real-world use cases...
          </p>
          <p className="text-lg leading-relaxed">
            Get access to detailed technical analysis, market trends, and expert opinions from industry leaders...
          </p>
          <div className="mt-8 p-6 bg-muted rounded-lg">
            <h3 className="text-2xl font-semibold mb-3">What You'll Learn:</h3>
            <ul className="space-y-2 text-base">
              <li>• Advanced BCH transaction techniques</li>
              <li>• Smart contract development on Bitcoin Cash</li>
              <li>• Payment infrastructure best practices</li>
              <li>• Security and privacy considerations</li>
              <li>• Real-world adoption case studies</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Lock Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[600px] bg-background/80 backdrop-blur-sm">
        <div className="text-center space-y-6 p-8 max-w-md">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 animate-glow">
            <Lock className="w-10 h-10 text-primary" />
          </div>
          <h3 className="text-3xl font-bold text-foreground">Premium Content Locked</h3>
          <p className="text-muted-foreground text-lg">
            Unlock exclusive content with a micro-payment of just <span className="text-primary font-semibold">0.0001 BCH</span>
          </p>
          <button
            onClick={onUnlock}
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-primary-foreground bg-primary rounded-xl hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            Unlock with BCH
          </button>
          <p className="text-sm text-muted-foreground">
            Fast • Secure • Low Fees
          </p>
        </div>
      </div>
    </div>
  );
};

export default LockedContent;
