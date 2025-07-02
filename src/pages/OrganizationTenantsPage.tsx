import React, { FC } from "react";
import {
  DashboardPageHeader,
  DataTableColumnHeader,
  StateFullDataTable,
  TablerIcon,
} from "@hive/esm-core-components";
import { ActionIcon, Box, Group, Stack } from "@mantine/core";
import { useRentalAgreements } from "../hooks";
import { ColumnDef } from "@tanstack/react-table";
import { RentalAgreement } from "../types";
import { PiletApi } from "@hive/esm-shell-app";
import { openConfirmModal } from "@mantine/modals";
import { Text } from "@mantine/core";
type Props = Pick<PiletApi, "launchWorkspace">;

const OrganizationTenantsPage: FC<Props> = ({ launchWorkspace }) => {
  const agreementsAsync = useRentalAgreements();

 
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
        {...agreementsAsync}
        data={agreementsAsync.agreements}
        withColumnViewOptions
      />
    </Stack>
  );
};

export default OrganizationTenantsPage;
const columns: ColumnDef<RentalAgreement>[] = [
  // {
  //   accessorKey: "title",
  //   header: "Title",
  //   cell({ row }) {
  //     const listing = row.original;
  //     const link = `/dashboard/listings/${listing.id}`;
  //     return (
  //       <Button variant="transparent" component={Link} to={link}>
  //         {listing.title}
  //       </Button>
  //     );
  //   },
  // },
  // {
  //   accessorKey: "type",
  //   header: "Type",
  //   cell({ getValue }) {
  //     const type = getValue<RentalAgreement["type"]>();
  //     return (
  //       <Badge variant="outline" color={getListingTypeColor(type)} size="xs">
  //         {type}
  //       </Badge>
  //     );
  //   },
  // },
  // {
  //   accessorKey: "listedDate",
  //   header({ column }) {
  //     return <DataTableColumnHeader column={column} title="Date listed" />;
  //   },
  //   cell({ getValue }) {
  //     const created = getValue<string>();
  //     return new Date(created).toDateString();
  //   },
  // },
  // {
  //   accessorKey: "price",
  //   header({ column }) {
  //     return <DataTableColumnHeader column={column} title="Price" />;
  //   },
  // },
  // {
  //   accessorKey: "expiryDate",
  //   header({ column }) {
  //     return <DataTableColumnHeader column={column} title="Expiry Date" />;
  //   },
  //   cell({ getValue }) {
  //     const created = getValue<string>();
  //     return new Date(created).toDateString();
  //   },
  // },
  // {
  //   accessorKey: "status",
  //   header({ column }) {
  //     return <DataTableColumnHeader column={column} title="Status" />;
  //   },
  //   cell({ getValue }) {
  //     const status = getValue<Listing["status"]>();
  //     const colorScheme = useComputedColorScheme();
  //     return (
  //       <Badge
  //         color={getStatusColor(status)}
  //         variant={getStatusVariant(status, colorScheme)}
  //       >
  //         {status}
  //       </Badge>
  //     );
  //   },
  // },
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
