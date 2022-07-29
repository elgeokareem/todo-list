import axios from "axios";
import useSWR from "swr";
import { GetDataServer } from "../types";

export function useFetch(isLoading: boolean = false) {
  const { data, error, mutate } = useSWR(
    isLoading ? null : "api/endpoints/getallusers",
    async url => {
      const res = await axios.get<GetDataServer>(url);

      return res.data;
    }
  );

  return {
    data,
    isLoadingData: !error && !data,
    errorFetch: error,
    mutate
  };
}
