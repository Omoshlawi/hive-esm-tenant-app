import { EmptyState } from "@hive/esm-core-components";
import { Loader, Select, SelectProps } from "@mantine/core";
import { closeModal, openModal } from "@mantine/modals";
import { IconSearch } from "@tabler/icons-react";
import React from "react";
import {
  Control,
  Controller,
  ControllerRenderProps,
  Path,
} from "react-hook-form";
import { useSearchTenants } from "../../hooks";
import TenantForm from "../TenantForm";
type Props<T> = SelectProps & {
  control: Control<T>;
  name: Path<T>;
};
const TenantInput = <T,>({ control, name, ...props }: Props<T>) => {
  const tenantsearchAsync = useSearchTenants();
  const handleAddTenant = ({ onChange }: ControllerRenderProps<T, Path<T>>) => {
    const id = openModal({
      title: "Add Tenant",
      children: (
        <TenantForm
          onCloseWorkspace={() => closeModal(id)}
          onSuccess={(tenant) => {
            tenantsearchAsync.searchTenants(tenant.person?.email);
            onChange(tenant.id);
          }}
        />
      ),
      size: "xl",
    });
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Select
          label="Tenant"
          placeholder="Search ..."
          leftSection={<IconSearch size={16} />}
          rightSection={tenantsearchAsync.isLoading && <Loader size="xs" />}
          {...props}
          {...field}
          value={field.value as string}
          nothingFoundMessage={
            <EmptyState
              py={0}
              title="Nothing found"
              message="Search ..."
              onAdd={() => handleAddTenant(field)}
            />
          }
          clearable
          searchable
          searchValue={tenantsearchAsync.tenantsSearchValue}
          onSearchChange={tenantsearchAsync.searchTenants}
          data={tenantsearchAsync.tenants.map((tenant) => ({
            label: tenant.person.email,
            value: tenant.id,
          }))}
          error={error?.message}
        />
      )}
    />
  );
};

export default TenantInput;
