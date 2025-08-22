import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { type DigitalLouse } from "@shared/schema";

export function useLouseState() {
  const queryClient = useQueryClient();

  const { data: louse, isLoading } = useQuery({
    queryKey: ["/api/louse"],
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const updateLouseMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<DigitalLouse> }) => {
      const response = await apiRequest("PUT", `/api/louse/${id}`, updates);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/louse"] });
    },
  });

  const updateLouse = (updates: Partial<DigitalLouse>) => {
    if (louse) {
      updateLouseMutation.mutate({ id: louse.id, updates });
    }
  };

  return {
    louse: louse as DigitalLouse | null,
    updateLouse,
    isLoading,
    isUpdating: updateLouseMutation.isPending,
  };
}
