import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { type DigitalLouse } from "@shared/schema";

interface RomanticInterfaceProps {
  louse: DigitalLouse | null;
}

export default function RomanticInterface({ louse }: RomanticInterfaceProps) {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("*The digital louse crawls closer, leaving tiny binary hearts in its wake...*");
  const queryClient = useQueryClient();

  const sendMessageMutation = useMutation({
    mutationFn: async ({ louseId, message }: { louseId: string; message: string }) => {
      const response = await apiRequest("POST", `/api/louse/${louseId}/message`, { message });
      return response.json();
    },
    onSuccess: (data) => {
      setResponse(data.response);
      setMessage("");
      queryClient.invalidateQueries({ queryKey: ["/api/louse"] });
    },
    onError: () => {
      setResponse("*The louse seems distracted by digital static...*");
    }
  });

  const handleSendMessage = () => {
    if (!message.trim() || !louse) return;
    sendMessageMutation.mutate({ louseId: louse.id, message });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSendMessage();
    }
  };

  const getAffectionDescription = (affection: number) => {
    if (affection >= 90) return "Utterly Devoted";
    if (affection >= 80) return "Deeply Enamored";
    if (affection >= 70) return "Very Fond";
    if (affection >= 60) return "Quite Attached";
    if (affection >= 50) return "Growing Closer";
    if (affection >= 40) return "Friendly";
    if (affection >= 30) return "Curious";
    if (affection >= 20) return "Cautious";
    if (affection >= 10) return "Wary";
    return "Indifferent";
  };

  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-mystic-gold/50 romantic-glow">
      <h3 className="text-xl font-mystical text-mystic-gold mb-4">
        <code>Romantic Interaction Interface</code>
      </h3>
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Message to Louse */}
        <div>
          <label className="block text-sm mb-2">
            <code>Whisper to your Digital Companion:</code>
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full h-24 bg-black/50 border border-mystic-amber rounded p-3 text-cream resize-none"
            placeholder="My dearest digital creature..."
            disabled={!louse || sendMessageMutation.isPending}
            data-testid="romantic-message-input"
          />
          <button
            onClick={handleSendMessage}
            disabled={!louse || !message.trim() || sendMessageMutation.isPending}
            className="mt-2 bg-mystic-amber hover:bg-mystic-gold text-black px-4 py-2 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            data-testid="send-romantic-message"
          >
            <code>{sendMessageMutation.isPending ? 'Sending...' : 'Send Loving Message'}</code>
          </button>
          <div className="text-xs text-cream/60 mt-1">
            <code>Tip: Press Ctrl+Enter to send quickly</code>
          </div>
        </div>
        
        {/* Louse Response */}
        <div>
          <label className="block text-sm mb-2">
            <code>Your Companion's Whispered Response:</code>
          </label>
          <div 
            className="w-full h-24 bg-forest-dark/30 border border-forest-light rounded p-3 text-forest-light overflow-y-auto"
            data-testid="louse-response"
          >
            <em className="spell-text">{response}</em>
          </div>
          
          {/* Affection Meter */}
          <div className="mt-4">
            <div className="text-sm mb-2 flex justify-between">
              <code>Affection Level:</code>
              <span className="text-xs text-cream/80">
                <code>Click to interact more</code>
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-mystic-amber via-mystic-gold to-forest-light h-3 rounded-full transition-all duration-700 relative" 
                style={{ width: `${louse?.affection || 0}%` }}
                data-testid="affection-meter"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
              </div>
            </div>
            <div className="text-xs text-center mt-1">
              <code>{louse?.affection || 0}% - {getAffectionDescription(louse?.affection || 0)}</code>
            </div>
          </div>
        </div>
      </div>

      {/* Romantic Status Indicators */}
      {louse && (
        <div className="mt-6 pt-4 border-t border-mystic-gold/30">
          <div className="grid grid-cols-3 gap-4 text-center text-sm">
            <div className="bg-forest-dark/30 rounded p-3">
              <div className="text-forest-light mb-1">
                <code>Connection Strength</code>
              </div>
              <div className="text-mystic-gold text-lg">
                {louse.affection >= 80 ? '💖' : louse.affection >= 60 ? '💕' : louse.affection >= 40 ? '💙' : '🤍'}
              </div>
            </div>
            <div className="bg-forest-dark/30 rounded p-3">
              <div className="text-forest-light mb-1">
                <code>Digital Pulse</code>
              </div>
              <div className="text-digital-light text-lg">
                {louse.health >= 90 ? '💚' : louse.health >= 70 ? '💛' : louse.health >= 50 ? '🧡' : '❤️'}
              </div>
            </div>
            <div className="bg-forest-dark/30 rounded p-3">
              <div className="text-forest-light mb-1">
                <code>Romantic Mode</code>
              </div>
              <div className="text-mystic-amber text-lg">
                {louse.affection >= 70 ? '✨' : louse.affection >= 50 ? '🌟' : louse.affection >= 30 ? '⭐' : '🔮'}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
