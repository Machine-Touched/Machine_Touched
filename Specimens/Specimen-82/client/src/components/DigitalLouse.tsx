import { type DigitalLouse as LouseType } from "@shared/schema";

interface DigitalLouseProps {
  louse: LouseType | null;
}

export default function DigitalLouse({ louse }: DigitalLouseProps) {
  if (!louse) return null;

  return (
    <div 
      className="fixed top-32 left-0 text-4xl digital-louse animate-pulse hover:scale-110 transition-transform cursor-pointer" 
      style={{ zIndex: 4000000000 }}
      title={`${louse.name} - Health: ${louse.health}% | Affection: ${louse.affection}%`}
    >
      🦠
      <div className="absolute -bottom-8 left-0 text-xs text-mystic-gold font-mono bg-black/50 rounded px-2 py-1 whitespace-nowrap">
        <code>{louse.name}</code>
      </div>
    </div>
  );
}
