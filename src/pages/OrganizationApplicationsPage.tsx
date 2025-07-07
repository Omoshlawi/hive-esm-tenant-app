import {
  DashboardPageHeader,
  DataTableColumnHeader,
  StateFullDataTable,
  TablerIcon,
} from "@hive/esm-core-components";
import { Stack, Box, ActionIcon, Group, Text } from "@mantine/core";
import React from "react";
import { useRentalApplications } from "../hooks";
import { RentalApplication } from "../types";
import { openConfirmModal } from "@mantine/modals";
import { ColumnDef } from "@tanstack/react-table";
import RenatlApplicationTable from "../components/application/RenatlApplicationTable";

const OrganizationApplicationsPage = () => {
  const applicationsAsync = useRentalApplications();
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
    <Stack>
      <Box>
        <DashboardPageHeader
          title="Rental Applications"
          subTitle={"Organization rental applications"}
          icon={"homeQuestion"}
        />
      </Box>
      <RenatlApplicationTable
        actions={[
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
        applicationsAsync={applicationsAsync}
      />
    </Stack>
  );
};

export default OrganizationApplicationsPage;
