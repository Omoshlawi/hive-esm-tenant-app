import useSWR from "swr";
import { RentalApplication, RentalApplicationFormData } from "../types";
import {
  apiFetch,
  APIFetchResponse,
  APIListResponse,
  constructUrl,
  mutate,
} from "@hive/esm-core-api";

export const useRentalApplications = (params: Record<string, any> = {}) => {
  const url = constructUrl("/rental-applications", { ...params });
  const { data, error, isLoading } =
    useSWR<APIFetchResponse<APIListResponse<RentalApplication>>>(url);
  return {
    applications: data?.data?.results ?? [],
    error,
    isLoading,
    totalCount: data?.data?.totalCount,
  };
};

const addApplication = async (data: RentalApplicationFormData) => {
  const res = await apiFetch<RentalApplication>("/rental-applications", {
    method: "POST",
    data,
  });
  return res.data;
};

const updateApplication = async (
  id: string,
  data: RentalApplicationFormData,
  method: "PUT" | "PATCH" = "PATCH"
) => {
  const res = await apiFetch<RentalApplication>(`/rental-applications/${id}`, {
    method: method,
    data,
  });
  return res.data;
};

const deleteApplication = async (
  id: string,
  method: "DELETE" | "PURGE" = "DELETE"
) => {
  const res = await apiFetch<RentalApplication>(`/rental-applications/${id}`, {
    method: method,
  });
  return res.data;
};

export const useRentalApplicationApi = () => {
  return {
    addApplication,
    updateApplication,
    deleteApplication,
    mutateAppointments: () => mutate("/rental-applications"),
  };
};
