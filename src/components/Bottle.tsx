import { cn } from "@/lib/utils";
import type { BottleColor } from "./GameBoard";

interface BottleProps {
  color: BottleColor;
  isSelected: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const bottleColorClasses = {
  red: "from-bottle-red to-bottle-red-glow shadow-[0_8px_25px_hsl(var(--bottle-red)_/_0.4)]",
  green: "from-bottle-green to-bottle-green-glow shadow-[0_8px_25px_hsl(var(--bottle-green)_/_0.4)]",
  blue: "from-bottle-blue to-bottle-blue-glow shadow-[0_8px_25px_hsl(var(--bottle-blue)_/_0.4)]",
  orange: "from-bottle-orange to-bottle-orange-glow shadow-[0_8px_25px_hsl(var(--bottle-orange)_/_0.4)]",
  purple: "from-bottle-purple to-bottle-purple-glow shadow-[0_8px_25px_hsl(var(--bottle-purple)_/_0.4)]",
  pink: "from-bottle-pink to-bottle-pink-glow shadow-[0_8px_25px_hsl(var(--bottle-pink)_/_0.4)]",
  teal: "from-bottle-teal to-bottle-teal-glow shadow-[0_8px_25px_hsl(var(--bottle-teal)_/_0.4)]",
  yellow: "from-bottle-yellow to-bottle-yellow-glow shadow-[0_8px_25px_hsl(var(--bottle-yellow)_/_0.4)]",
};

export const Bottle = ({ color, isSelected, onClick, disabled }: BottleProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "relative w-20 h-32 rounded-2xl transition-all duration-300 ease-out",
        "bg-gradient-to-b border-2 border-white/20",
        "hover:scale-105 active:scale-95",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
        bottleColorClasses[color],
        isSelected && [
          "scale-110 ring-4 ring-accent",
          "shadow-[0_0_30px_hsl(var(--accent)_/_0.6)]",
          "border-accent/50"
        ]
      )}
    >
      {/* Bottle highlight effect */}
      <div className="absolute inset-x-2 top-2 h-8 bg-white/30 rounded-full blur-sm" />
      
      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full border-2 border-white animate-pulse">
          <div className="w-full h-full bg-accent rounded-full animate-ping" />
        </div>
      )}
      
      {/* Bottle base */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-3 bg-black/20 rounded-full blur-sm" />
    </button>
  );
};