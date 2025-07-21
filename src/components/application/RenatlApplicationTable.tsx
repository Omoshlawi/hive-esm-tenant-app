import React, { FC } from "react";
import {
  DataTableColumnHeader,
  StateFullDataTable,
  TablerIcon,
} from "@hive/esm-core-components";
import { Button, Badge, ActionIcon } from "@mantine/core";
import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { PropsWithLaunchWorkspace, TenancyApplication } from "../../types";
import { getApplicationStatusColor } from "../../utils/helpers";
import { useTenancyApplications } from "../../hooks";
import RentalApplicationDetail from "./RentalApplicationDetail";
type Props = PropsWithLaunchWorkspace & {
  applicationsAsync: ReturnType<typeof useTenancyApplications>;
  actions?: Array<ColumnDef<TenancyApplication>>;
  onAddOrupdate?: (application?: TenancyApplication) => void;
};

const RenatlApplicationTable: FC<Props> = ({
  applicationsAsync,
  actions,
  onAddOrupdate: handleAddOrupdate,
  launchWorkspace,
}) => {
  const handleCreateRentalAgreement = () => {
    // Logic to create rental agreement
  };
  return (
    <StateFullDataTable
      onAdd={() => handleAddOrupdate?.()}
      columns={[...columns, ...actions]}
      {...applicationsAsync}
      data={applicationsAsync.applications}
      withColumnViewOptions
      renderExpandedRow={({ original: { id } }) => (
        <RentalApplicationDetail
          applicationId={id}
          launchWorkspace={launchWorkspace}
        />
      )}
    />
  );
};

export default RenatlApplicationTable;

export const columns: ColumnDef<TenancyApplication>[] = [
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
      const type = getValue<TenancyApplication["status"]>();
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
