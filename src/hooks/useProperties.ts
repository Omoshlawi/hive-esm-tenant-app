import { APIFetchResponse, constructUrl } from "@hive/esm-core-api";
import { useState } from "react";
import useSWR from "swr";
import { Property } from "../types";
import { useDebouncedValue } from "@mantine/hooks";

export const useSearchProperties = () => {
  const [search, searchProperty] = useState<string>("");
  const [debounced] = useDebouncedValue(search, 500);

  const url = constructUrl(`/properties`, {
    search: debounced,
    status: "APPROVED",
  });

  const { data, error, isLoading } = useSWR<
    APIFetchResponse<{ results: Array<Property> }>
  >(debounced ? url : null);
  return {
    isLoading,
    error,
    properties: data?.data?.results ?? [],
    searchProperty,
    search,
  };
};

export const useProperty = (propertyId: string) => {
  const url = constructUrl(`/properties/${propertyId}`);
  const { data, error, isLoading } = useSWR<APIFetchResponse<Property>>(url);
  return {
    property: data?.data,
    isLoading,
    error,
  };
};
