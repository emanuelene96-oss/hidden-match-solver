import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { GameMode } from "./GameBoard";

interface ModeSelectorProps {
  onModeSelect: (mode: GameMode) => void;
}

const modeData = {
  easy: {
    title: "Easy",
    bottles: 5,
    description: "Perfect for beginners",
    gradient: "from-success to-success-foreground",
    icon: "🟢"
  },
  medium: {
    title: "Medium", 
    bottles: 6,
    description: "A good challenge",
    gradient: "from-accent to-accent-glow",
    icon: "🟡"
  },
  hard: {
    title: "Hard",
    bottles: 8, 
    description: "For puzzle masters",
    gradient: "from-error to-error-foreground",
    icon: "🔴"
  }
};

export const ModeSelector = ({ onModeSelect }: ModeSelectorProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-surface flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-foreground mb-4">
          🧪 Bottle Puzzle
        </h1>
        <p className="text-xl text-muted-foreground max-w-md">
          Swap bottles to match the hidden arrangement. Only the match count is revealed!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
        {(Object.entries(modeData) as [GameMode, typeof modeData.easy][]).map(([mode, data]) => (
          <Card 
            key={mode}
            className="p-8 text-center hover:scale-105 transition-all duration-300 cursor-pointer bg-surface-elevated shadow-xl"
            onClick={() => onModeSelect(mode)}
          >
            <div className="text-6xl mb-4">{data.icon}</div>
            <h3 className="text-2xl font-bold mb-2 text-foreground">
              {data.title}
            </h3>
            <p className="text-lg text-primary font-semibold mb-2">
              {data.bottles} Bottles
            </p>
            <p className="text-muted-foreground mb-6">
              {data.description}
            </p>
            <Button 
              className={`w-full bg-gradient-to-r ${data.gradient} text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300`}
              onClick={() => onModeSelect(mode)}
            >
              Start Game
            </Button>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold text-foreground mb-4">How to Play</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl text-center">
          <div className="p-4">
            <div className="text-3xl mb-2">👆</div>
            <h3 className="font-semibold text-foreground mb-2">Tap to Select</h3>
            <p className="text-sm text-muted-foreground">Tap a bottle to select it</p>
          </div>
          <div className="p-4">
            <div className="text-3xl mb-2">🔄</div>
            <h3 className="font-semibold text-foreground mb-2">Tap to Swap</h3>
            <p className="text-sm text-muted-foreground">Tap another bottle to swap positions</p>
          </div>
          <div className="p-4">
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="font-semibold text-foreground mb-2">Match Hidden Pattern</h3>
            <p className="text-sm text-muted-foreground">Only the match count is revealed!</p>
          </div>
        </div>
      </div>
    </div>
  );
};