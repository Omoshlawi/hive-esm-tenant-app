import {
  DashboardPageHeader,
  DataTableColumnHeader,
  StateFullDataTable,
  TablerIcon,
} from "@hive/esm-core-components";
import { PiletApi } from "@hive/esm-shell-app";
import { ActionIcon, Box, Button, Group, Stack, Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { ColumnDef } from "@tanstack/react-table";
import React, { FC } from "react";
import TenantForm from "../forms/TenantForm";
import { useTenants } from "../hooks";
import { RentalAgreement, Tenant } from "../types";
import { Link } from "react-router-dom";
type Props = Pick<PiletApi, "launchWorkspace">;

const OrganizationTenantsPage: FC<Props> = ({ launchWorkspace }) => {
  const tenantsAsync = useTenants();

  const handleAddOrupdate = (tenant?: Tenant) => {
    const dispose = launchWorkspace(
      <TenantForm
        tenant={tenant}
        onSuccess={() => dispose()}
        onCloseWorkspace={() => dispose()}
      />,
      {
        title: tenant ? "Update tenant" : "Add Tenant",
        width: "extra-wide",
        expandable: true,
      }
    );
  };
  const handleDelete = (agreement: RentalAgreement) => {
    openConfirmModal({
      title: "Delete listing",
      children: (
        <Text>
          Are you sure you want to delete this role.This action is destructive
          and will delete all data related to role
        </Text>
      ),
      labels: { confirm: "Delete Listing", cancel: "No don't delete it" },
      confirmProps: { color: "red" },
      centered: true,
      onConfirm() {
        // TODO Implement delete
      },
    });
  };

  return (
    <Stack>
      <Box>
        <DashboardPageHeader
          title="Tenants"
          subTitle={"Organization tenants"}
          icon={"users"}
        />
      </Box>
      <StateFullDataTable
        onAdd={() => handleAddOrupdate()}
        columns={[
          ...columns,
          {
            id: "actions",
            header: "Actions",
            cell({ row }) {
              const listing = row.original;
              return (
                <Group>
                  <Group>
                    <ActionIcon
                      variant="outline"
                      aria-label="Settings"
                      color="green"
                      onClick={() => handleAddOrupdate(listing)}
                    >
                      <TablerIcon
                        name="edit"
                        style={{ width: "70%", height: "70%" }}
                        stroke={1.5}
                      />
                    </ActionIcon>
                    <ActionIcon
                      variant="outline"
                      aria-label="Settings"
                      color="red"
                      onClick={() => handleDelete(listing)}
                    >
                      <TablerIcon
                        name="trash"
                        style={{ width: "70%", height: "70%" }}
                        stroke={1.5}
                      />
                    </ActionIcon>
                  </Group>
                </Group>
              );
            },
          },
        ]}
        {...tenantsAsync}
        data={tenantsAsync.tenants}
        withColumnViewOptions
      />
    </Stack>
  );
};

export default OrganizationTenantsPage;
const columns: ColumnDef<Tenant>[] = [
  {
    accessorKey: "person.email",
    header: "Email",
    cell({ row }) {
      const tenant = row.original;
      const link = `/dashboard/tenants/${tenant.id}`;
      return (
        <Button variant="transparent" component={Link} to={link}>
          {tenant.person.email ?? "--"}
        </Button>
      );
    },
  },
  {
    accessorKey: "person.name",
    header: "Name",
    cell({ getValue }) {
      const name = getValue<string | null>();
      return name ?? "--";
    },
  },
  {
    accessorKey: "person.phoneNumber",
    header: "Name",
    cell({ getValue }) {
      const name = getValue<string | null>();
      return name ?? "--";
    },
  },
  {
    accessorKey: "person.gender",
    header: "Gender",
    cell({ getValue }) {
      const name = getValue<string | null>();
      return name ?? "--";
    },
  },
  {
    accessorKey: "createdAt",
    header({ column }) {
      return <DataTableColumnHeader column={column} title="Date Created" />;
    },
    cell({ getValue }) {
      const created = getValue<string>();
      return new Date(created).toDateString();
    },
  },
];
