import useSWR from "swr";
import { fetcher } from "../data/api";
import normalizeData from "./normalizers";

const BASE_URL = 'https://pokeapi.co/api/v2';

const ENDPOINTS = {
  type: '/type',
  generation: '/generation'
}

const usePokemonData = (endpointName, shouldNormalize = true) => {
  try {
    if (!endpointName) throw new Error('No endpoint provided to usePokemonData hook.');
  
    const url = `${BASE_URL}${ENDPOINTS[endpointName] || endpointName}`
    const { data, error } = useSWR(url, fetcher);
  
    return {
      data: shouldNormalize ? normalizeData(data, endpointName) : data,
      isLoading: !error && !data,
      isError: error
    }

  } catch (err) {
    console.log(err);
    return {}
  }
}

export default usePokemonData;