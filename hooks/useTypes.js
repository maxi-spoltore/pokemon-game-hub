import useSWR from "swr";
import { fetcher } from "../data/api";

const discardedPokemonTypes = ['unknown', 'shadow']

const useTypes = () => {
  const { data, error } = useSWR('https://pokeapi.co/api/v2/type', fetcher);
	const { results = [] } = data || {};
	const parsedResults = results.filter(result => !discardedPokemonTypes.includes(result.name));

  return {
    data: parsedResults,
    isLoading: !error && !data,
    isError: error
  }
}

export default useTypes;