import useSWR from "swr";
import { TenancyAgreement, TenancyAgreementFormData } from "../types";
import {
  apiFetch,
  APIFetchResponse,
  APIListResponse,
  constructUrl,
  mutate,
} from "@hive/esm-core-api";

export const useTenancyAgreements = () => {
  const { data, isLoading, error } = useSWR<
    APIFetchResponse<APIListResponse<TenancyAgreement>>
  >("/tenancy-agreements");
  return {
    agreements: data?.data?.results ?? [],
    isLoading,
    error,
  };
};

export const useTenancyAgreement = (id: string) => {
  const url = constructUrl(`/tenancy-agreements/${id}`, {
    v: "custom:include(additionalCharges,participants:include(tenant),leaseDetails,rentalDetails,shortTermDetails,statusHistory)",
  });
  const { data, isLoading, error } =
    useSWR<APIFetchResponse<TenancyAgreement>>(url);
  return {
    agreement: data?.data ?? null,
    isLoading,
    error,
  };
};

const addAgreement = async (data: TenancyAgreementFormData) => {
  const res = await apiFetch<TenancyAgreement>("/tenancy-agreements", {
    method: "POST",
    data,
  });
  return res.data;
};

const updateAgreement = async (
  id: string,
  data: TenancyAgreementFormData,
  method: "PUT" | "PATCH" = "PATCH"
) => {
  const res = await apiFetch<TenancyAgreement>(`/tenancy-agreements/${id}`, {
    method: method,
    data,
  });
  return res.data;
};

const deleteAgreement = async (
  id: string,
  method: "DELETE" | "PURGE" = "DELETE"
) => {
  const res = await apiFetch<TenancyAgreement>(`/tenancy-agreements/${id}`, {
    method: method,
  });
  return res.data;
};

export const useTenancyAgreementApi = () => {
  return {
    addAgreement,
    updateAgreement,
    deleteAgreement,
    mutateAgreements: () => mutate("/tenancy-agreements"),
  };
};
