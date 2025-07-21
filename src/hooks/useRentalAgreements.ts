import useSWR from "swr";
import { RentalAgreement, RentalAgreementFormdata } from "../types";
import {
  apiFetch,
  APIFetchResponse,
  APIListResponse,
  constructUrl,
  mutate,
} from "@hive/esm-core-api";

export const useRentalAgreements = () => {
  const { data, isLoading, error } =
    useSWR<APIFetchResponse<APIListResponse<RentalAgreement>>>(
      "/rental-agreements"
    );
  return {
    agreements: data?.data?.results ?? [],
    isLoading,
    error,
  };
};

export const useRentalAgreement = (id: string) => {
  const url = constructUrl(`/rental-agreements/${id}`, {
    v: "custom:include(additionalCharges,participants:include(tenant),leaseDetails,rentalDetails,shortTermDetails,statusHistory)",
  });
  const { data, isLoading, error } =
    useSWR<APIFetchResponse<RentalAgreement>>(url);
  return {
    agreement: data?.data ?? null,
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
    mutateAgreements: () => mutate("/rental-agreements"),
  };
};
