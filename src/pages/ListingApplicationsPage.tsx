import { StateFullDataTable, TablerIcon } from "@hive/esm-core-components";
import { PiletApi } from "@hive/esm-shell-app";
import { ActionIcon, Group, Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import React, { FC } from "react";
import { useParams } from "react-router";
import ListingApplicationForm from "../forms/ListingApplicationForm";
import { useRentalApplications } from "../hooks";
import { TenancyApplication } from "../types";
import RenatlApplicationTable from "../components/application/RenatlApplicationTable";

type Props = Pick<PiletApi, "launchWorkspace">;

const ListingApplicationsPage: FC<Props> = ({ launchWorkspace }) => {
  const { listingId } = useParams<{ listingId: string }>();
  const applicationsAsync = useRentalApplications({ listingId });

  const handleAddOrupdate = (application?: TenancyApplication) => {
    const dispose = launchWorkspace(
      <ListingApplicationForm
        application={application}
        onSuccess={() => dispose()}
        onCloseWorkspace={() => dispose()}
        listingId={listingId}
      />,
      {
        title: application ? "Update Application" : "Add Application",
        width: "extra-wide",
        expandable: true,
      }
    );
  };
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
    <RenatlApplicationTable
      onAddOrupdate={handleAddOrupdate}
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
  );
};

export default ListingApplicationsPage;
