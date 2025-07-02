import useSWR from "swr";
import { RentalAgreement } from "../types";

export const useRentalAgreements = () => {
  const { data, isLoading, error } = useSWR<{
    data: { results: Array<RentalAgreement> };
  }>("/rental-agreements", (url: string) =>
    Promise.resolve({ data: { results: [] } })
  );
  return {
    agreements: data?.data?.results ?? [],
    isLoading,
    error,
  };
};
