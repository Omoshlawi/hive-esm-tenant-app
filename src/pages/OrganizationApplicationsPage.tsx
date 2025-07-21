import { DashboardPageHeader, TablerIcon } from "@hive/esm-core-components";
import { ActionIcon, Box, Group, Stack, Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import React, { FC } from "react";
import RenatlApplicationTable from "../components/application/RenatlApplicationTable";
import { useTenancyApplications } from "../hooks";
import { PropsWithLaunchWorkspace, TenancyApplication } from "../types";
import { useSession } from "@hive/esm-core-api";

const OrganizationApplicationsPage: FC<PropsWithLaunchWorkspace> = ({
  launchWorkspace,
}) => {
  const applicationsAsync = useTenancyApplications();
  const { currentOrganization } = useSession();
  const handleDelete = (application: TenancyApplication) => {
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
          title="Tenancy Applications"
          subTitle={`${
            currentOrganization ? "Organization" : "My"
          } rental applications`}
          icon={"homeQuestion"}
        />
      </Box>
      <RenatlApplicationTable
        launchWorkspace={launchWorkspace}
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
