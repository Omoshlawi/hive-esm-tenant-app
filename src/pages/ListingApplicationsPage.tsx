import {
  DataTableColumnHeader,
  StateFullDataTable,
  TablerIcon,
} from "@hive/esm-core-components";
import { PiletApi } from "@hive/esm-shell-app";
import { ColumnDef } from "@tanstack/react-table";
import React, { FC } from "react";
import { useParams } from "react-router";
import { RentalApplication } from "../types";
import { useRentalApplications } from "../hooks";
import { openConfirmModal } from "@mantine/modals";
import { ActionIcon, Group, Text } from "@mantine/core";
import ListingApplicationForm from "../forms/ListingApplicationForm";

type Props = Pick<PiletApi, "launchWorkspace">;

const ListingApplicationsPage: FC<Props> = ({ launchWorkspace }) => {
  const { listingId } = useParams<{ listingId: string }>();
  const applicationsAsync = useRentalApplications({ listingId });

  const handleAddOrupdate = (application?: RentalApplication) => {
    const dispose = launchWorkspace(
      <ListingApplicationForm
        application={application}
        onSuccess={() => dispose()}
        onCloseWorkspace={() => dispose()}
      />,
      {
        title: application ? "Update Application" : "Add Application",
        width: "extra-wide",
        expandable: true,
      }
    );
  };
  const handleDelete = (application: RentalApplication) => {
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
      {...applicationsAsync}
      data={applicationsAsync.applications}
      withColumnViewOptions
    />
  );
};

export default ListingApplicationsPage;
const columns: ColumnDef<RentalApplication>[] = [
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
