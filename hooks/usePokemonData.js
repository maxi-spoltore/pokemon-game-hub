import useSWR from "swr";
import { fetcher } from "../data/api";
import normalizeData from "./normalizers";

const BASE_URL = 'https://pokeapi.co/api/v2';

const ENDPOINTS = {
  type: '/type',
  generation: '/generation'
}

const useTypes = endpointName => {
  if (!endpointName) return null;

  const url = `${BASE_URL}${ENDPOINTS[endpointName]}`
  const { data, error } = useSWR(url, fetcher);
  const normalizedData = normalizeData(data, endpointName);

  return {
    data: normalizedData,
    isLoading: !error && !data,
    isError: error
  }
}

export default useTypes;