import GhostLogo from "@/components/GhostLogo";
import WalletConnect from "@/components/WalletConnect";
import TradingDashboard from "@/components/TradingDashboard";
import heroBg from "@/assets/hero-bg.png";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-background cyber-grid">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <GhostLogo />
            <WalletConnect />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-block">
              <div className="text-sm uppercase tracking-widest text-secondary mb-4 animate-pulse">
                Encrypted Trading Protocol
              </div>
              <h1 className="text-6xl md:text-8xl font-bold mb-6">
                <span className="text-glow-teal text-secondary">Trade</span>{" "}
                <span className="text-glow-magenta text-primary">Without</span>{" "}
                <span className="text-glow-teal text-secondary">Trace</span>
              </h1>
            </div>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Execute encrypted transactions invisible to competitors. Your trades remain 
              cloaked until session end. Master privacy-preserving strategies in our 
              stealth simulation environment.
            </p>
            
            <div className="flex items-center justify-center gap-4 pt-8">
              <Button 
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 glow-magenta group"
              >
                Start Trading
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-secondary text-secondary hover:bg-secondary/10 hover:text-secondary"
              >
                Learn Protocol
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-16 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-glow-teal text-secondary">100%</div>
                <div className="text-sm text-muted-foreground">Encrypted</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-glow-magenta text-primary">0</div>
                <div className="text-sm text-muted-foreground">Trace</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">████</div>
                <div className="text-sm text-muted-foreground">Hidden Traders</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-glow-teal text-secondary mb-4">
              Live Trading Terminal
            </h2>
            <p className="text-muted-foreground">
              All data encrypted in real-time • Decryption occurs post-session
            </p>
          </div>
          
          <TradingDashboard />
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="holographic-panel p-8 text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center glow-magenta">
              <div className="text-3xl">🔒</div>
            </div>
            <h3 className="text-xl font-bold text-primary">End-to-End Encryption</h3>
            <p className="text-sm text-muted-foreground">
              All transactions encrypted during session. Zero visibility to competitors.
            </p>
          </div>
          
          <div className="holographic-panel p-8 text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-secondary/20 rounded-full flex items-center justify-center glow-teal">
              <div className="text-3xl">👻</div>
            </div>
            <h3 className="text-xl font-bold text-secondary">Stealth Mode</h3>
            <p className="text-sm text-muted-foreground">
              Trade like a ghost. Your strategy remains invisible until reveal.
            </p>
          </div>
          
          <div className="holographic-panel p-8 text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-accent/20 rounded-full flex items-center justify-center">
              <div className="text-3xl">📊</div>
            </div>
            <h3 className="text-xl font-bold text-accent">Post-Session Analytics</h3>
            <p className="text-sm text-muted-foreground">
              Full transaction history and rankings revealed after session ends.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
