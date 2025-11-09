import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TradeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTrade: (amount: string, type: "buy" | "sell") => void;
}

const TradeDialog = ({ open, onOpenChange, onTrade }: TradeDialogProps) => {
  const [amount, setAmount] = useState("");
  const [tradeType, setTradeType] = useState<"buy" | "sell">("buy");
  const { toast } = useToast();

  const handleTrade = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid trade amount",
        variant: "destructive",
      });
      return;
    }

    onTrade(amount, tradeType);
    setAmount("");
    onOpenChange(false);
    
    toast({
      title: "Trade Encrypted",
      description: `${tradeType.toUpperCase()} order of ${amount} ETH encrypted successfully`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="holographic-panel border-secondary/50">
        <DialogHeader>
          <DialogTitle className="text-glow-teal text-secondary flex items-center gap-2">
            <Lock className="w-5 h-5" />
            New Encrypted Trade
          </DialogTitle>
          <DialogDescription>
            Your transaction will be encrypted and hidden until session ends
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Trade Type</Label>
            <div className="flex gap-2">
              <Button
                variant={tradeType === "buy" ? "default" : "outline"}
                onClick={() => setTradeType("buy")}
                className={tradeType === "buy" ? "bg-secondary text-secondary-foreground hover:bg-secondary/90" : ""}
              >
                Buy
              </Button>
              <Button
                variant={tradeType === "sell" ? "default" : "outline"}
                onClick={() => setTradeType("sell")}
                className={tradeType === "sell" ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""}
              >
                Sell
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (ETH)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="font-mono"
              step="0.01"
              min="0"
            />
          </div>
          
          <div className="bg-muted/30 p-4 rounded border border-border/50 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Encryption</span>
              <span className="text-secondary">AES-256</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Visibility</span>
              <span className="text-primary">Hidden</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Decryption</span>
              <span className="text-accent">Post-Session</span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleTrade}
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 glow-magenta"
          >
            <Lock className="w-4 h-4 mr-2" />
            Encrypt & Execute
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TradeDialog;
