import { Lock, TrendingUp, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const TradingDashboard = () => {
  const encryptedTrades = [
    { id: "█████", amount: "████", status: "encrypted", time: "██:██" },
    { id: "█████", amount: "████", status: "encrypted", time: "██:██" },
    { id: "█████", amount: "████", status: "encrypted", time: "██:██" },
    { id: "█████", amount: "████", status: "encrypted", time: "██:██" },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="holographic-panel p-6 glow-teal">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Trades</p>
              <p className="text-3xl font-bold text-glow-teal text-secondary">████</p>
            </div>
            <Lock className="w-8 h-8 text-secondary" />
          </div>
        </Card>
        
        <Card className="holographic-panel p-6 glow-magenta">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Hidden Profit</p>
              <p className="text-3xl font-bold text-glow-magenta text-primary">████</p>
            </div>
            <EyeOff className="w-8 h-8 text-primary" />
          </div>
        </Card>
        
        <Card className="holographic-panel p-6 border-accent/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Session Rank</p>
              <p className="text-3xl font-bold text-accent">██</p>
            </div>
            <TrendingUp className="w-8 h-8 text-accent" />
          </div>
        </Card>
      </div>

      {/* Trading Feed */}
      <Card className="holographic-panel p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-glow-teal text-secondary">Encrypted Transactions</h2>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Eye className="w-4 h-4" />
            <span className="animate-flicker">STEALTH MODE ACTIVE</span>
          </div>
        </div>
        
        <div className="space-y-3">
          {encryptedTrades.map((trade, idx) => (
            <div 
              key={idx}
              className="flex items-center justify-between p-4 bg-card/50 border border-border rounded hover:border-secondary/50 transition-all"
            >
              <div className="flex items-center gap-4">
                <Lock className="w-4 h-4 text-primary animate-pulse" />
                <div>
                  <p className="font-mono text-sm">ID: {trade.id}</p>
                  <p className="text-xs text-muted-foreground">{trade.time}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-mono text-lg text-glow-magenta">{trade.amount}</p>
                <p className="text-xs text-primary uppercase">{trade.status}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Leaderboard Preview */}
      <Card className="holographic-panel p-6">
        <h2 className="text-xl font-bold text-glow-magenta text-primary mb-4">Hidden Leaderboard</h2>
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((rank) => (
            <div key={rank} className="flex items-center justify-between p-3 bg-card/30 border border-border/50 rounded">
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-muted-foreground">#{rank}</span>
                <span className="font-mono">████████</span>
              </div>
              <span className="font-mono text-sm text-glow-teal">████</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-center text-muted-foreground mt-4 italic">
          Rankings decrypt after session ends
        </p>
      </Card>
    </div>
  );
};

export default TradingDashboard;
