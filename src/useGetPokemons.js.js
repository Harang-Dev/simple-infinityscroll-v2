import { useInfiniteQuery } from "@tanstack/react-query";

const fetchPokemons = async (pageParam) => {
  const limit = 30;
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${pageParam * limit}`
  );
  const data = await response.json();

  return data;
};
  const useGetPokemons = () => {
    return useInfiniteQuery({
      queryKey: ['pokemon'],
      queryFn: ({ pageParam }) => fetchPokemons(pageParam),
      getNextPageParam: (lastPage, pages) => {
        const currentOffset = lastPage.results.length * pages.length;
        if (currentOffset < 1305) {
          return pages.length;
        }
        return undefined;
      },
      initialPageParam: 0,
    });
  };
  

export default useGetPokemons;

