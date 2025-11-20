import { CheckCircle } from "lucide-react";

const UnlockedContent = () => {
  return (
    <div className="min-h-[600px] rounded-2xl border border-border bg-card p-12 animate-unlock">
      <div className="flex items-center gap-3 mb-8">
        <CheckCircle className="w-8 h-8 text-primary" />
        <h2 className="text-4xl font-bold text-foreground">Content Unlocked!</h2>
      </div>

      <div className="space-y-6 text-foreground">
        <p className="text-lg leading-relaxed">
          Thank you for your payment! You now have full access to this premium content.
        </p>

        <div className="p-6 bg-primary/5 rounded-xl border border-primary/20">
          <h3 className="text-2xl font-semibold mb-4">Your Premium Content</h3>
          <p className="text-base leading-relaxed text-muted-foreground">
            Replace this section with your actual premium content. This could be articles, videos, downloads, or any valuable information you want to share with paying customers.
          </p>
        </div>

        <div className="mt-8 p-6 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl border border-primary/30">
          <p className="text-lg font-semibold text-foreground">
            Thank you for your support! 🚀
          </p>
          <p className="text-muted-foreground mt-2">
            Your payment was successfully processed with Bitcoin Cash.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UnlockedContent;
