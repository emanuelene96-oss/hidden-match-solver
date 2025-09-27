import { useState } from "react";
import { ModeSelector } from "@/components/ModeSelector";
import { GameBoard, type GameMode } from "@/components/GameBoard";

const Index = () => {
  const [currentMode, setCurrentMode] = useState<GameMode | null>(null);

  const handleModeSelect = (mode: GameMode) => {
    setCurrentMode(mode);
  };

  const handleBackToMenu = () => {
    setCurrentMode(null);
  };

  if (currentMode) {
    return <GameBoard mode={currentMode} onBackToMenu={handleBackToMenu} />;
  }

  return <ModeSelector onModeSelect={handleModeSelect} />;
};

export default Index;
