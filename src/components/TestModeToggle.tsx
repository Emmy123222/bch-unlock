import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";

const TestModeToggle = () => {
  const [testMode, setTestMode] = useState(
    localStorage.getItem('testMode') === 'true'
  );

  const handleToggle = (checked: boolean) => {
    setTestMode(checked);
    localStorage.setItem('testMode', checked.toString());
    
    if (checked) {
      console.log('🧪 TEST MODE ENABLED: Payments will auto-confirm after 10 seconds');
    } else {
      console.log('✅ TEST MODE DISABLED: Real blockchain verification active');
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-card border border-border rounded-lg p-4 shadow-lg max-w-sm">
        <div className="flex items-center gap-3 mb-2">
          <AlertCircle className="w-5 h-5 text-yellow-500" />
          <Label htmlFor="test-mode" className="text-sm font-semibold">
            Test Mode
          </Label>
          <Switch
            id="test-mode"
            checked={testMode}
            onCheckedChange={handleToggle}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          {testMode 
            ? "⚠️ Payments auto-confirm after 10 seconds (for testing)" 
            : "Real BCH blockchain verification active"}
        </p>
      </div>
    </div>
  );
};

export default TestModeToggle;
