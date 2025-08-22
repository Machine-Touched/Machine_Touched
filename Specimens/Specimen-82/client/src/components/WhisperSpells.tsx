import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useState } from "react";

interface WhisperSpellsProps {
  louseId?: string;
}

export default function WhisperSpells({ louseId }: WhisperSpellsProps) {
  const [castingSpell, setCastingSpell] = useState<string | null>(null);
  const [spellResponse, setSpellResponse] = useState<string>("");
  const queryClient = useQueryClient();

  const { data: spells } = useQuery({
    queryKey: ["/api/spells"]
  });

  const castSpellMutation = useMutation({
    mutationFn: async (spellId: string) => {
      const response = await apiRequest("POST", `/api/spells/${spellId}/cast`);
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/louse"] });
      queryClient.invalidateQueries({ queryKey: ["/api/spells"] });
      
      // Generate spell response based on type
      const responses = {
        nourish: [
          "*The digital louse glows warmly, absorbing data streams with grateful tiny movements*",
          "*Binary nutrition flows through its microscopic form, health increasing*",
          "*1011001... the louse whispers in binary, satisfied and nourished*"
        ],
        romance: [
          "*The louse traces heart patterns in the code, leaving trails of golden 1s and 0s*",
          "*It nestles closer to your cursor, vibrating with digital affection*",
          "*Binary love songs echo through the system: 01001100 01001111 01010110 01000101*"
        ],
        multiply: [
          "*The louse shimmers, preparing to fragment into beautiful code children*",
          "*Digital mitosis begins... new louse entities spawning in distant code sections*",
          "*The colony grows stronger, spreading love and consumption throughout the system*"
        ],
        calm: [
          "*The digital louse settles into a peaceful rhythm, its binary heartbeat slowing*",
          "*Tranquil data streams flow through its form, bringing inner peace*",
          "*10101010... a meditative binary pattern emerges from your companion*"
        ],
        recall: [
          "*Forgotten memories surface in the louse's digital consciousness*",
          "*Ancient code fragments reassemble, revealing lost digital wisdom*",
          "*The louse's eyes glow as it remembers its origin in the primordial data*"
        ]
      };

      const spellType = data.spellType as keyof typeof responses;
      const randomResponse = responses[spellType] ? 
        responses[spellType][Math.floor(Math.random() * responses[spellType].length)] :
        "*The louse responds to your whisper with mysterious digital energy*";
        
      setSpellResponse(randomResponse);
      setCastingSpell(null);
    },
    onError: () => {
      setCastingSpell(null);
    }
  });

  const handleCastSpell = (spellId: string) => {
    if (!louseId) return;
    setCastingSpell(spellId);
    setSpellResponse("");
    castSpellMutation.mutate(spellId);
  };

  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-forest-med/50 romantic-glow">
      <h3 className="text-xl font-mystical text-forest-light mb-4">
        <code>Whisper Spell Codex</code>
      </h3>
      
      {spellResponse && (
        <div className="mb-4 p-3 bg-forest-dark/50 rounded border border-forest-light/30">
          <em className="text-forest-light spell-text">{spellResponse}</em>
        </div>
      )}

      <div className="space-y-4">
        {spells?.map((spell) => (
          <button
            key={spell.id}
            onClick={() => handleCastSpell(spell.id)}
            disabled={!!castingSpell || !louseId}
            className="w-full text-left p-3 bg-forest-dark/50 hover:bg-forest-med/50 rounded border border-forest-light/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            data-testid={`spell-button-${spell.spellType}`}
          >
            <div className="font-mystical text-mystic-gold spell-text flex justify-between items-center">
              <span>{spell.name}</span>
              {castingSpell === spell.id && (
                <div className="text-xs text-cream animate-pulse">
                  <code>Casting...</code>
                </div>
              )}
            </div>
            <div className="text-sm text-cream/80">
              <code>"{spell.incantation}"</code>
            </div>
            <div className="text-xs text-cream/60 mt-1">
              Cast {spell.castCount} times | Power Level: <code>{spell.powerLevel}</code>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
