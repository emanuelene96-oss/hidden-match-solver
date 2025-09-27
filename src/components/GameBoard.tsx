import { useState, useEffect } from "react";
import { Bottle } from "./Bottle";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

export type BottleColor = "red" | "green" | "blue" | "orange" | "purple" | "pink" | "teal" | "yellow";
export type GameMode = "easy" | "medium" | "hard";

interface GameBoardProps {
  mode: GameMode;
  onBackToMenu: () => void;
}

const BOTTLE_SETS = {
  easy: 5,
  medium: 6,
  hard: 8,
};

const AVAILABLE_COLORS: BottleColor[] = ["red", "green", "blue", "orange", "purple", "pink", "teal", "yellow"];

export const GameBoard = ({ mode, onBackToMenu }: GameBoardProps) => {
  const bottleCount = BOTTLE_SETS[mode];
  const [visible, setVisible] = useState<BottleColor[]>([]);
  const [target, setTarget] = useState<BottleColor[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [moveCount, setMoveCount] = useState(0);
  const [matchCount, setMatchCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Initialize game
  useEffect(() => {
    initializeGame();
  }, [mode]);

  const shuffle = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const initializeGame = () => {
    const colors = AVAILABLE_COLORS.slice(0, bottleCount);
    const targetArrangement = shuffle(colors);
    let visibleArrangement;

    // Ensure the initial arrangement has 0 matches for proper challenge
    do {
      visibleArrangement = shuffle(colors);
    } while (countMatches(visibleArrangement, targetArrangement) > 0);

    setTarget(targetArrangement);
    setVisible(visibleArrangement);
    setSelected(null);
    setMoveCount(0);
    setMatchCount(0);
    setIsComplete(false);
  };

  const countMatches = (arr1: BottleColor[], arr2: BottleColor[]): number => {
    return arr1.reduce((count, color, index) => {
      return count + (color === arr2[index] ? 1 : 0);
    }, 0);
  };

  const handleBottleTap = (index: number) => {
    if (isComplete) return;

    if (selected === null) {
      setSelected(index);
      return;
    }

    if (selected === index) {
      setSelected(null);
      return;
    }

    // Perform swap
    const newVisible = [...visible];
    [newVisible[selected], newVisible[index]] = [newVisible[index], newVisible[selected]];
    
    setVisible(newVisible);
    setMoveCount(prev => prev + 1);
    setSelected(null);

    const newMatchCount = countMatches(newVisible, target);
    setMatchCount(newMatchCount);

    // Check for completion
    if (newMatchCount === bottleCount) {
      setIsComplete(true);
      toast({
        title: "🎉 Puzzle Complete!",
        description: `Solved in ${moveCount + 1} moves!`,
      });
    } else {
      const message = newMatchCount === 0 
        ? "No bottles match" 
        : `${newMatchCount} bottle${newMatchCount > 1 ? 's' : ''} match`;
      
      toast({
        title: message,
        variant: newMatchCount > matchCount ? "default" : "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-surface p-4 flex flex-col items-center justify-center">
      <Card className="p-8 max-w-2xl w-full bg-surface-elevated shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Button 
            variant="outline" 
            onClick={onBackToMenu}
            className="px-6"
          >
            ← Back
          </Button>
          <div className="text-center">
            <h2 className="text-2xl font-bold capitalize text-foreground">
              {mode} Mode ({bottleCount} bottles)
            </h2>
            <p className="text-muted-foreground">Moves: {moveCount}</p>
          </div>
          <Button 
            variant="secondary" 
            onClick={initializeGame}
            className="px-6"
          >
            New Game
          </Button>
        </div>

        {/* Match Counter */}
        <div className="text-center mb-8">
          <div className="text-4xl font-bold text-primary mb-2">
            {matchCount}/{bottleCount}
          </div>
          <p className="text-muted-foreground">
            {isComplete ? "🎉 All bottles match!" : "Bottles in correct position"}
          </p>
        </div>

        {/* Game Board */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {visible.map((color, index) => (
            <Bottle
              key={index}
              color={color}
              isSelected={selected === index}
              onClick={() => handleBottleTap(index)}
              disabled={isComplete}
            />
          ))}
        </div>

        {/* Instructions */}
        <div className="text-center text-sm text-muted-foreground">
          <p>Tap one bottle, then tap another to swap their positions.</p>
          <p>Match the hidden arrangement - only the count is revealed!</p>
        </div>
      </Card>
    </div>
  );
};