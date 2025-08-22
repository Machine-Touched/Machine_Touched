import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export default function AuthPortal() {
  const [password, setPassword] = useState("");
  const [authStatus, setAuthStatus] = useState("robot_password: ?");
  const [statusClass, setStatusClass] = useState("text-sm");
  const queryClient = useQueryClient();

  const { data: session } = useQuery({
    queryKey: ["/api/session"]
  });

  const authenticateMutation = useMutation({
    mutationFn: async (password: string) => {
      const response = await apiRequest("POST", "/api/session/authenticate", { password });
      return response.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        setAuthStatus(`robot_password: ${password} ✓ AUTHENTICATED`);
        setStatusClass("text-sm text-forest-light");
      } else {
        setAuthStatus(`robot_password: ${password} ✗ ACCESS DENIED`);
        setStatusClass("text-sm text-red-400");
      }
      queryClient.invalidateQueries({ queryKey: ["/api/session"] });
      setPassword("");
    },
    onError: () => {
      setAuthStatus(`robot_password: ${password} ✗ AUTH ERROR`);
      setStatusClass("text-sm text-red-400");
      setPassword("");
    }
  });

  const handleAuthenticate = () => {
    if (!password.trim()) return;
    authenticateMutation.mutate(password);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAuthenticate();
    }
  };

  return (
    <div 
      className="fixed top-4 right-4 auth-portal rounded-lg p-4 romantic-glow" 
      style={{ zIndex: 6000000000 }}
    >
      <h3 className="text-mystic-amber font-mystical mb-2">
        <code>Binary Access Portal</code>
      </h3>
      <div className="flex space-x-2 mb-2">
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value.replace(/[^01]/g, '').slice(0, 4))}
          onKeyPress={handleKeyPress}
          maxLength={4}
          className="w-20 bg-black/50 border border-mystic-amber rounded px-2 py-1 text-mystic-gold text-center font-mono"
          placeholder="1011"
          data-testid="auth-input"
        />
        <button
          onClick={handleAuthenticate}
          disabled={authenticateMutation.isPending}
          className="bg-forest-med hover:bg-forest-dark px-3 py-1 rounded text-white transition-colors disabled:opacity-50"
          data-testid="auth-button"
        >
          <code>{authenticateMutation.isPending ? 'AUTH...' : 'AUTH'}</code>
        </button>
      </div>
      <div className={statusClass}>
        <code>{session?.accessGranted ? `robot_password: ${session.binaryPassword} ✓ AUTHENTICATED` : authStatus}</code>
      </div>
      {session?.accessGranted && (
        <div className="text-xs text-forest-light/80 mt-1">
          <code>access_level: {session.authLevel}</code>
        </div>
      )}
    </div>
  );
}
