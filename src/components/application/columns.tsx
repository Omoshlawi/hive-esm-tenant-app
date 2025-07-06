import { DataTableColumnHeader } from "@hive/esm-core-components";
import { Button, Badge } from "@mantine/core";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { Link } from "react-router-dom";
import { RentalApplication } from "../../types";
import { getApplicationStatusColor } from "../../utils/helpers";

export const columns: ColumnDef<RentalApplication>[] = [
  {
    accessorKey: "applicationNumber",
    header({ column }) {
      return (
        <DataTableColumnHeader column={column} title="Application number" />
      );
    },
  },
  {
    accessorKey: "person",
    header: "Applicant",
    cell({ row }) {
      const listing = row.original;
      const link = `/dashboard/listings/${listing.id}`;
      return (
        <Button
          variant="transparent"
          component={Link}
          to={link}
          justify="start"
          p={0}
          m={0}
        >
          {listing?.person?.name ?? listing?.person?.email ?? "--"}
        </Button>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell({ getValue }) {
      const type = getValue<RentalApplication["status"]>();
      return (
        <Badge
          variant="outline"
          color={getApplicationStatusColor(type)}
          size="xs"
        >
          {type}
        </Badge>
      );
    },
  },

  {
    accessorKey: "desiredMoveInDate",
    header({ column }) {
      return (
        <DataTableColumnHeader column={column} title="Desired move in date" />
      );
    },
    cell({ getValue }) {
      const created = getValue<string>();
      return new Date(created).toDateString();
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