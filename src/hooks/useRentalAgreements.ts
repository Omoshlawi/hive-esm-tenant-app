import useSWR from "swr";
import { RentalAgreement, RentalAgreementFormdata } from "../types";
import { apiFetch } from "@hive/esm-core-api";

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

const addAgreement = async (data: RentalAgreementFormdata) => {
  const res = await apiFetch<RentalAgreement>("/rental-agreement", {
    method: "POST",
    data,
  });
  return res.data;
};

const updateAgreement = async (
  id: string,
  data: RentalAgreementFormdata,
  method: "PUT" | "PATCH" = "PATCH"
) => {
  const res = await apiFetch<RentalAgreement>(`/rental-agreement/${id}`, {
    method: method,
    data,
  });
  return res.data;
};

const deleteAgreement = async (
  id: string,
  method: "DELETE" | "PURGE" = "DELETE"
) => {
  const res = await apiFetch<RentalAgreement>(`/rental-agreement/${id}`, {
    method: method,
  });
  return res.data;
};

export const useRentalAgreementApi = () => {
  return {
    addAgreement,
    updateAgreement,
    deleteAgreement,
    mutateAgreements: () => useSWR("/rental-agreements"),
  };
};
