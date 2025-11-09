import { Button } from "@/components/ui/button";
import { Wallet, Shield } from "lucide-react";

const WalletConnect = () => {
  return (
    <div className="flex items-center gap-4">
      <Button 
        variant="outline" 
        className="border-secondary text-secondary hover:bg-secondary/10 hover:text-secondary glow-teal"
      >
        <Shield className="w-4 h-4 mr-2" />
        Connect Rainbow Wallet
      </Button>
      
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Wallet className="w-4 h-4" />
        <span className="font-mono">Not Connected</span>
      </div>
    </div>
  );
};

export default WalletConnect;
