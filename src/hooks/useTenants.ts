import {
  apiFetch,
  APIFetchResponse,
  APIListResponse,
  constructUrl,
  mutate,
  useSession,
} from "@hive/esm-core-api";
import useSWR from "swr";
import { Tenant, TenantFormData } from "../types";
import { useMemo, useState } from "react";
import { useDebouncedValue } from "@mantine/hooks";

export const useTenants = () => {
  const session = useSession();
  const url = constructUrl("/tenants", {
    context: session.currentOrganization,
  });
  const { data, error, isLoading, mutate } =
    useSWR<APIFetchResponse<APIListResponse<Tenant>>>(url);

  return {
    tenants: data?.data?.results ?? [],
    isLoading,
    error,
    totalCount: data?.data?.totalCount,
  };
};

export const useSearchTenants = () => {
  const [search, setSearch] = useState<string>();
  const [debounced] = useDebouncedValue(search, 500);
  const url = useMemo(() => {
    if (!debounced) return null;
    return constructUrl("/tenants", {
      search: debounced,
      // v: "custom:include(user)",
    });
  }, [debounced]);
  const { data, error, isLoading } =
    useSWR<APIFetchResponse<{ results: Array<Tenant> }>>(url);
  return {
    tenants: data?.data?.results ?? [],
    isLoading,
    error,
    searchTenants: setSearch,
    tenantsSearchValue: search,
  };
};

const addTenant = async (data: TenantFormData) => {
  const res = await apiFetch<Tenant>("/tenants", {
    method: "POST",
    data,
  });
  return res.data;
};

const updateTenant = async (
  id: string,
  data: TenantFormData,
  method: "PUT" | "PATCH" = "PATCH"
) => {
  const res = await apiFetch<Tenant>(`/tenants/${id}`, {
    method: method,
    data,
  });
  return res.data;
};

const deleteTenant = async (
  id: string,
  method: "DELETE" | "PURGE" = "DELETE"
) => {
  const res = await apiFetch<Tenant>(`/tenants/${id}`, {
    method: method,
  });
  return res.data;
};

export const useTenantApi = () => {
  return {
    addTenant,
    updateTenant,
    deleteTenant,
    mutateTenants: () => mutate("/tenants"),
  };
};
