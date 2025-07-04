import {
  APIFetchResponse,
  constructUrl,
  Person,
  User,
} from "@hive/esm-core-api";
import { useDebouncedValue } from "@mantine/hooks";
import { useState } from "react";
import useSWR from "swr";

export const useSearchUser = () => {
  const [search, setSearch] = useState<string>();
  const [debounced] = useDebouncedValue(search, 500);
  const url = constructUrl("/users", {
    search: debounced,
    v: "custom:include(person)",
  });
  const { data, error, isLoading } = useSWR<
    APIFetchResponse<{ results: Array<User> }>
  >(debounced ? url : undefined);
  return {
    users: data?.data?.results ?? [],
    isLoading,
    error,
    searchUser: setSearch,
    searchValue: search,
  };
};

export const useContactPerson = (userId: string) => {
  const url = constructUrl(`/users/${userId}`, {
    v: "custom:include(person)",
  });
  const { data, error, isLoading } = useSWR<APIFetchResponse<User>>(
    userId ? url : undefined
  );
  return {
    contactPerson: data?.data,
    isLoading,
    error,
  };
};

export const useSearchPeople = () => {
  const [search, setSearch] = useState<string>();
  const [debounced] = useDebouncedValue(search, 500);
  const url = constructUrl("/person", {
    search: debounced,
    v: "custom:include(user)",
  });
  const { data, error, isLoading } = useSWR<
    APIFetchResponse<{ results: Array<Person> }>
  >(debounced ? url : undefined);
  return {
    people: data?.data?.results ?? [],
    isLoading,
    error,
    searchPeople: setSearch,
    peopleSearchValue: search,
  };
};
