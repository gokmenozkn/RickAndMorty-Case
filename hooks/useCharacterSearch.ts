import { useQuery } from '@tanstack/react-query';

export const useCharacterSearch = (query: string) => {
  return useQuery({
    queryKey: ['characters', query],
    queryFn: async () => {
      if (!query) return { results: [] };
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?name=${query}`
      );
      if (!response.ok) throw new Error('API request failed');
      return response.json();
    },
    enabled: query.length > 0,
  });
};
