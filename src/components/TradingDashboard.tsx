import { useState } from "react";
import { Lock, TrendingUp, Eye, EyeOff, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import TradeDialog from "./TradeDialog";
import { useToast } from "@/hooks/use-toast";

interface Trade {
  id: string;
  amount: string;
  status: string;
  time: string;
  type: "buy" | "sell";
}

const TradingDashboard = () => {
  const [trades, setTrades] = useState<Trade[]>([
    { id: "█████", amount: "████", status: "encrypted", time: "██:██", type: "buy" },
    { id: "█████", amount: "████", status: "encrypted", time: "██:██", type: "sell" },
    { id: "█████", amount: "████", status: "encrypted", time: "██:██", type: "buy" },
    { id: "█████", amount: "████", status: "encrypted", time: "██:██", type: "sell" },
  ]);
  const [tradeDialogOpen, setTradeDialogOpen] = useState(false);
  const [sessionActive, setSessionActive] = useState(true);
  const { toast } = useToast();

  const handleNewTrade = (amount: string, type: "buy" | "sell") => {
    const newTrade: Trade = {
      id: "█████",
      amount: "████",
      status: "encrypted",
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }).replace(/:/g, ':'),
      type,
    };
    setTrades([newTrade, ...trades]);
  };

  const handleEndSession = () => {
    setSessionActive(false);
    
    // Decrypt trades
    const decryptedTrades = trades.map((trade, idx) => ({
      ...trade,
      id: `TX${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      amount: `${(Math.random() * 10).toFixed(4)} ETH`,
      status: "decrypted",
    }));
    
    setTrades(decryptedTrades);
    
    toast({
      title: "Session Ended",
      description: "All transactions decrypted. Rankings revealed!",
      duration: 5000,
    });
  };

  const handleStartSession = () => {
    setSessionActive(true);
    
    // Re-encrypt trades
    const encryptedTrades = trades.map(trade => ({
      ...trade,
      id: "█████",
      amount: "████",
      status: "encrypted",
    }));
    
    setTrades(encryptedTrades);
    
    toast({
      title: "New Session Started",
      description: "Stealth mode activated. All trades now encrypted.",
    });
  };

  const activeTrades = sessionActive ? trades.length : "████";
  const hiddenProfit = sessionActive ? "████" : `${(Math.random() * 100).toFixed(2)} ETH`;
  const sessionRank = sessionActive ? "██" : Math.floor(Math.random() * 99) + 1;

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Eye className={`w-5 h-5 ${sessionActive ? 'text-primary animate-pulse' : 'text-muted-foreground'}`} />
          <span className="text-sm font-medium">
            {sessionActive ? 'STEALTH MODE ACTIVE' : 'SESSION ENDED - DATA REVEALED'}
          </span>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => setTradeDialogOpen(true)}
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90 glow-teal"
            disabled={!sessionActive}
          >
            <Plus className="w-4 h-4 mr-2" />
            New Trade
          </Button>
          {sessionActive ? (
            <Button
              onClick={handleEndSession}
              variant="destructive"
            >
              End Session
            </Button>
          ) : (
            <Button
              onClick={handleStartSession}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Start New Session
            </Button>
          )}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="holographic-panel p-6 glow-teal">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Trades</p>
              <p className="text-3xl font-bold text-glow-teal text-secondary">{activeTrades}</p>
            </div>
            <Lock className="w-8 h-8 text-secondary" />
          </div>
        </Card>
        
        <Card className="holographic-panel p-6 glow-magenta">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Profit</p>
              <p className="text-3xl font-bold text-glow-magenta text-primary">{hiddenProfit}</p>
            </div>
            <EyeOff className="w-8 h-8 text-primary" />
          </div>
        </Card>
        
        <Card className="holographic-panel p-6 border-accent/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Session Rank</p>
              <p className="text-3xl font-bold text-accent">{sessionRank}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-accent" />
          </div>
        </Card>
      </div>

      {/* Trading Feed */}
      <Card className="holographic-panel p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-glow-teal text-secondary">
            {sessionActive ? 'Encrypted Transactions' : 'Decrypted Transaction History'}
          </h2>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {sessionActive ? (
              <>
                <Eye className="w-4 h-4" />
                <span className="animate-flicker">STEALTH MODE ACTIVE</span>
              </>
            ) : (
              <>
                <EyeOff className="w-4 h-4" />
                <span>VISIBLE</span>
              </>
            )}
          </div>
        </div>
        
        <div className="space-y-3">
          {trades.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No trades yet. Start a new trade to begin.
            </div>
          ) : (
            trades.map((trade, idx) => (
              <div 
                key={idx}
                className={`flex items-center justify-between p-4 bg-card/50 border rounded hover:border-secondary/50 transition-all ${
                  trade.type === 'buy' ? 'border-secondary/30' : 'border-primary/30'
                }`}
              >
                <div className="flex items-center gap-4">
                  {sessionActive && <Lock className="w-4 h-4 text-primary animate-pulse" />}
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-mono text-sm">ID: {trade.id}</p>
                      {!sessionActive && (
                        <span className={`text-xs px-2 py-0.5 rounded ${
                          trade.type === 'buy' 
                            ? 'bg-secondary/20 text-secondary' 
                            : 'bg-primary/20 text-primary'
                        }`}>
                          {trade.type.toUpperCase()}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{trade.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-mono text-lg ${sessionActive ? 'text-glow-magenta' : ''}`}>
                    {trade.amount}
                  </p>
                  <p className={`text-xs uppercase ${
                    sessionActive ? 'text-primary' : 'text-secondary'
                  }`}>
                    {trade.status}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>

      {/* Leaderboard Preview */}
      <Card className="holographic-panel p-6">
        <h2 className="text-xl font-bold text-glow-magenta text-primary mb-4">
          {sessionActive ? 'Hidden Leaderboard' : 'Final Rankings'}
        </h2>
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((rank) => (
            <div 
              key={rank} 
              className={`flex items-center justify-between p-3 bg-card/30 border border-border/50 rounded transition-all ${
                !sessionActive ? 'hover:border-accent/50' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`text-sm font-bold ${
                  rank === 1 && !sessionActive ? 'text-accent' : 'text-muted-foreground'
                }`}>
                  #{rank}
                </span>
                <span className="font-mono">
                  {sessionActive 
                    ? '████████' 
                    : `0x${Math.random().toString(16).substr(2, 8)}`}
                </span>
              </div>
              <span className={`font-mono text-sm ${sessionActive ? 'text-glow-teal' : ''}`}>
                {sessionActive 
                  ? '████' 
                  : `${(Math.random() * 100).toFixed(2)} ETH`}
              </span>
            </div>
          ))}
        </div>
        <p className="text-xs text-center text-muted-foreground mt-4 italic">
          {sessionActive 
            ? 'Rankings decrypt after session ends' 
            : 'Session complete - all data revealed'}
        </p>
      </Card>
      
      <TradeDialog 
        open={tradeDialogOpen}
        onOpenChange={setTradeDialogOpen}
        onTrade={handleNewTrade}
      />
    </div>
  );
};

export default TradingDashboard;
