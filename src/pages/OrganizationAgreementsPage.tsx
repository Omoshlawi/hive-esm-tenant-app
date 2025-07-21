import {
  DashboardPageHeader,
  DataTableColumnHeader,
  StateFullDataTable,
  TablerIcon,
} from "@hive/esm-core-components";
import { Stack, Box, ActionIcon, Group, Button } from "@mantine/core";
import React from "react";
import { useTenancyAgreements } from "../hooks";
import { ColumnDef } from "@tanstack/react-table";
import { TenancyAgreement } from "../types";
import { Link } from "react-router-dom";
import PropertyCell from "../components/PropertyCell";
import { useSession } from "@hive/esm-core-api";

const OrganizationAgreementsPage = () => {
  const agreementsAsync = useTenancyAgreements();
  const { currentOrganization } = useSession();
  return (
    <Stack>
      <Box>
        <DashboardPageHeader
          title="Tenancy Agreements"
          subTitle={`${
            currentOrganization ? "Organization" : "My"
          } rental agreements`}
          icon={"contract"}
        />
      </Box>
      <StateFullDataTable
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
                      color="red"
                      // onClick={() => handleDelete(listing)}
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
        {...agreementsAsync}
        data={agreementsAsync.agreements}
        withColumnViewOptions
      />
    </Stack>
  );
};

export default OrganizationAgreementsPage;
const columns: ColumnDef<TenancyAgreement>[] = [
  {
    accessorKey: "agreementNumber",
    header: ({ column }) => (
      <DataTableColumnHeader title="Agrement number" column={column} />
    ),
    cell({ row }) {
      const agreement = row.original;
      const url = `/dashboard/properties/${agreement.propertyId}/agreements/${agreement.id}`;
      return (
        <Button component={Link} to={url} variant="transparent" p={0} m={0}>
          {agreement.agreementNumber}
        </Button>
      );
    },
  },
  { accessorKey: "agreementType", header: "Type" },
  {
    accessorKey: "propertyId",
    header: "Property",
    cell({ getValue }) {
      const propertyId = getValue<string>();
      return <PropertyCell propertyId={propertyId} />;
    },
  },
  { accessorKey: "status", header: "Status" },
  {
    accessorKey: "startDate",
    header({ column }) {
      return <DataTableColumnHeader column={column} title="Start Date" />;
    },
    cell({ getValue }) {
      const created = getValue<string>();
      return new Date(created).toDateString();
    },
  },
  {
    accessorKey: "endDate",
    header({ column }) {
      return <DataTableColumnHeader column={column} title="End Date" />;
    },
    cell({ getValue }) {
      const created = getValue<string>();
      return new Date(created).toDateString();
    },
  },
  { accessorKey: "baseRentAmount", header: "Rent amount" },
  {
    accessorKey: "autoRenewal",
    header: "Auto renewal",
    cell({ getValue }) {
      const value = getValue<boolean>();
      return (
        <TablerIcon
          name={value ? "circleCheck" : "circleX"}
          color={value ? "green" : "red"}
        />
      );
    },
  },
  {
    accessorKey: "petsAllowed",
    header: "Pets allowed",
    cell({ getValue }) {
      const value = getValue<boolean>();
      return (
        <TablerIcon
          name={value ? "circleCheck" : "circleX"}
          color={value ? "green" : "red"}
        />
      );
    },
  },
  {
    accessorKey: "smokingAllowed",
    header: "Smoking allowed",
    cell({ getValue }) {
      const value = getValue<boolean>();
      return (
        <TablerIcon
          name={value ? "circleCheck" : "circleX"}
          color={value ? "green" : "red"}
        />
      );
    },
  },
  {
    accessorKey: "sublettingAllowed",
    header: "Subletting allowed",
    cell({ getValue }) {
      const value = getValue<boolean>();
      return (
        <TablerIcon
          name={value ? "circleCheck" : "circleX"}
          color={value ? "green" : "red"}
        />
      );
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
