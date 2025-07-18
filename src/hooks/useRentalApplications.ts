import useSWR from "swr";
import {
  RentalApplication,
  RentalApplicationCoApplicants,
  RentalApplicationFormData,
  RentalApplicationReference,
} from "../types";
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

export const useRentalApplication = (
  id: string,
  params: Record<string, any> = {}
) => {
  const url = constructUrl(`/rental-applications/${id}`, {
    ...params,
  });
  const { data, error, isLoading } =
    useSWR<APIFetchResponse<RentalApplication>>(url);
  return {
    application: data?.data,
    error,
    isLoading,
  };
};
export const useRentalApplicationReferences = (
  applicationId: string,
  params: Record<string, any> = {}
) => {
  const url = constructUrl(`/rental-applications/${applicationId}/references`, {
    pageSize: 100,
    ...params,
  });
  const { data, error, isLoading } =
    useSWR<APIFetchResponse<APIListResponse<RentalApplicationReference>>>(url);
  return {
    references: data?.data?.results ?? [],
    error,
    isLoading,
  };
};
export const useRentalApplicationCoApplicants = (
  applicationId: string,
  params: Record<string, any> = {}
) => {
  const url = constructUrl(
    `/rental-applications/${applicationId}/co-applicants`,
    {
      pageSize: 100,
      ...params,
    }
  );
  const { data, error, isLoading } =
    useSWR<APIFetchResponse<APIListResponse<RentalApplicationCoApplicants>>>(
      url
    );
  return {
    coApplicants: data?.data?.results ?? [],
    error,
    isLoading,
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
const approvePendingApplication = async (applicationId: string) => {
  const res = await apiFetch(
    `/rental-applications/${applicationId}/status/approve`,
    {
      method: "POST",
    }
  );
  return res.data;
};
export const useRentalApplicationApi = () => {
  return {
    addApplication,
    updateApplication,
    deleteApplication,
    mutateApplications: () => mutate("/rental-applications"),
    approvePendingApplication,
  };
};
