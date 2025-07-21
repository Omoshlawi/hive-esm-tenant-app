import useSWR from "swr";
import {
  TenancyApplication,
  TenancyApplicationCoApplicants,
  TenancyApplicationFormData,
  TenancyApplicationReference,
} from "../types";
import {
  apiFetch,
  APIFetchResponse,
  APIListResponse,
  constructUrl,
  mutate,
} from "@hive/esm-core-api";

export const useTenancyApplications = (params: Record<string, any> = {}) => {
  const url = constructUrl("/tenancy-applications", { ...params });
  const { data, error, isLoading } =
    useSWR<APIFetchResponse<APIListResponse<TenancyApplication>>>(url);
  return {
    applications: data?.data?.results ?? [],
    error,
    isLoading,
    totalCount: data?.data?.totalCount,
  };
};

export const useTenancyApplication = (
  id: string,
  params: Record<string, any> = {}
) => {
  const url = constructUrl(`/tenancy-applications/${id}`, {
    ...params,
  });
  const { data, error, isLoading } =
    useSWR<APIFetchResponse<TenancyApplication>>(url);
  return {
    application: data?.data,
    error,
    isLoading,
  };
};
export const useTenancyApplicationReferences = (
  applicationId: string,
  params: Record<string, any> = {}
) => {
  const url = constructUrl(
    `/tenancy-applications/${applicationId}/references`,
    {
      pageSize: 100,
      ...params,
    }
  );
  const { data, error, isLoading } =
    useSWR<APIFetchResponse<APIListResponse<TenancyApplicationReference>>>(url);
  return {
    references: data?.data?.results ?? [],
    error,
    isLoading,
  };
};
export const useTenancyApplicationCoApplicants = (
  applicationId: string,
  params: Record<string, any> = {}
) => {
  const url = constructUrl(
    `/tenancy-applications/${applicationId}/co-applicants`,
    {
      pageSize: 100,
      ...params,
    }
  );
  const { data, error, isLoading } =
    useSWR<APIFetchResponse<APIListResponse<TenancyApplicationCoApplicants>>>(
      url
    );
  return {
    coApplicants: data?.data?.results ?? [],
    error,
    isLoading,
  };
};

const addApplication = async (data: TenancyApplicationFormData) => {
  const res = await apiFetch<TenancyApplication>("/tenancy-applications", {
    method: "POST",
    data,
  });
  return res.data;
};

const updateApplication = async (
  id: string,
  data: TenancyApplicationFormData,
  method: "PUT" | "PATCH" = "PATCH"
) => {
  const res = await apiFetch<TenancyApplication>(
    `/tenancy-applications/${id}`,
    {
      method: method,
      data,
    }
  );
  return res.data;
};

const deleteApplication = async (
  id: string,
  method: "DELETE" | "PURGE" = "DELETE"
) => {
  const res = await apiFetch<TenancyApplication>(
    `/tenancy-applications/${id}`,
    {
      method: method,
    }
  );
  return res.data;
};
const approvePendingApplication = async (applicationId: string) => {
  const res = await apiFetch(
    `/tenancy-applications/${applicationId}/status/approve`,
    {
      method: "POST",
    }
  );
  return res.data;
};
export const useTenancyApplicationApi = () => {
  return {
    addApplication,
    updateApplication,
    deleteApplication,
    mutateApplications: () => mutate("/tenancy-applications"),
    approvePendingApplication,
  };
};
