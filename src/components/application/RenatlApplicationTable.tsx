import React, { FC } from "react";
import {
  DataTableColumnHeader,
  StateFullDataTable,
  TablerIcon,
} from "@hive/esm-core-components";
import { Button, Badge, ActionIcon } from "@mantine/core";
import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { RentalApplication } from "../../types";
import { getApplicationStatusColor } from "../../utils/helpers";
import { useRentalApplications } from "../../hooks";
import RentalApplicationDetail from "./RentalApplicationDetail";
type Props = {
  applicationsAsync: ReturnType<typeof useRentalApplications>;
  actions?: Array<ColumnDef<RentalApplication>>;
  onAddOrupdate?: (application?: RentalApplication) => void;
};

const RenatlApplicationTable: FC<Props> = ({
  applicationsAsync,
  actions,
  onAddOrupdate: handleAddOrupdate,
}) => {
  return (
    <StateFullDataTable
      onAdd={() => handleAddOrupdate?.()}
      columns={[...columns, ...actions]}
      {...applicationsAsync}
      data={applicationsAsync.applications}
      withColumnViewOptions
      renderExpandedRow={({ original: { id } }) => (
        <RentalApplicationDetail applicationId={id} />
      )}
    />
  );
};

export default RenatlApplicationTable;

export const columns: ColumnDef<RentalApplication>[] = [
  {
    id: "expand",
    size: 0,
    header: ({ table }) => {
      const allRowsExpanded = table.getIsAllRowsExpanded();
      //   const someRowsExpanded = table.getIsSomeRowsExpanded();
      return (
        <ActionIcon
          variant="subtle"
          color="gray"
          onClick={() => table.toggleAllRowsExpanded(!allRowsExpanded)}
          style={{ cursor: "pointer" }}
          aria-label="Expand all"
        >
          <TablerIcon
            name={allRowsExpanded ? "chevronUp" : "chevronDown"}
            size={16}
          />
        </ActionIcon>
      );
    },
    cell: ({ row }) => {
      const rowExpanded = row.getIsExpanded();
      return (
        <ActionIcon
          variant="subtle"
          color="gray"
          onClick={() => row.toggleExpanded(!rowExpanded)}
          style={{ cursor: "pointer" }}
          aria-label="Expand Row"
        >
          <TablerIcon
            name={rowExpanded ? "chevronUp" : "chevronDown"}
            size={16}
          />
        </ActionIcon>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "applicationNumber",
    header({ column }) {
      return (
        <DataTableColumnHeader column={column} title="Application number" />
      );
    },
    // cell({ row }) {
    //   const application = row.original;
    //   const link = `/dashboard/listings/${application.listingId}/applications/${application.id}`;
    //   return (
    //     <Button
    //       variant="transparent"
    //       component={Link}
    //       to={link}
    //       justify="start"
    //       p={0}
    //       m={0}
    //     >
    //       {application?.applicationNumber ?? "--"}
    //     </Button>
    //   );
    // },
  },
  {
    accessorKey: "person",
    header: "Applicant",
    cell({ row }) {
      const application = row.original;
      const link = `/dashboard/listings/${application.listingId}/applications`;
      return (
        <Button
          variant="transparent"
          component={Link}
          to={link}
          justify="start"
          p={0}
          m={0}
        >
          {application?.person?.name ?? application?.person?.email ?? "--"}
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
