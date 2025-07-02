import useSWR from "swr";
import { RentalApplication } from "../types";
import { constructUrl } from "@hive/esm-core-api";

export const useRentalApplications = (params: Record<string, any> = {}) => {
  const url = constructUrl("/rental-application", { ...params });
  const { data, error, isLoading } = useSWR<{
    data: { results: Array<RentalApplication> };
  }>(url, () => Promise.resolve({ data: { results: [] } }));
  return {
    applications: data?.data?.results ?? [],
    error,
    isLoading,
  };
};
