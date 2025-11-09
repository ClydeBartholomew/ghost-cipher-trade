import ghostLogo from "@/assets/ghost-logo.png";

const GhostLogo = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <img 
          src={ghostLogo} 
          alt="GhostTrade Logo" 
          className="w-12 h-12 animate-pulse"
        />
        <div className="absolute inset-0 bg-cyber-teal/20 blur-xl animate-pulse"></div>
      </div>
      <div className="flex flex-col">
        <span className="text-2xl font-bold text-glow-magenta text-primary">GhostTrade</span>
        <span className="text-xs text-secondary tracking-wider">STEALTH PROTOCOL</span>
      </div>
    </div>
  );
};

export default GhostLogo;
