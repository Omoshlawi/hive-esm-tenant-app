import { Group, Button, Alert, Text } from "@mantine/core";
import React, { FC } from "react";
import { useRentalApplication, useRentalApplicationApi } from "../../hooks";
import { handleApiErrors } from "@hive/esm-core-api";
import { openConfirmModal, openModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";

type Props = {
  applicationId: string;
};

const ApplicationActions: FC<Props> = ({ applicationId }) => {
  const { application, isLoading, error } = useRentalApplication(applicationId);
  const { approvePendingApplication, mutateApplications } =
    useRentalApplicationApi();
  if (isLoading) return null;
  if (error)
    return (
      <Alert color="red" variant="light" title="Error loading application">
        {handleApiErrors(error)?.detail}
      </Alert>
    );

  const handleApproveApplication = () => {
    openConfirmModal({
      title: "Please confirm your action",
      children: <Text>Are you sure you want to approve the application</Text>,
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onConfirm: async () => {
        try {
          await approvePendingApplication(applicationId);
          mutateApplications();
        } catch (error) {
          showNotification({
            color: "red",
            title: "Error approving",
            message: handleApiErrors(error)?.detail,
          });
        }
      },
    });
  };
  return (
    <Group justify="flex-end">
      {application.status === "DRAFT" && (
        <Button size="xs" variant="outline">
          Submit for review
        </Button>
      )}
      {application.status === "PENDING" && (
        <Button
          size="xs"
          variant="outline"
          color="green"
          onClick={handleApproveApplication}
        >
          Approve Application
        </Button>
      )}
      {application.status === "APPROVED" && (
        <Button size="xs" variant="outline" color="teal">
          Create Rental Agreement
        </Button>
      )}
      {application.status === "PENDING" && (
        <Button size="xs" variant="outline" color="red">
          Reject Application
        </Button>
      )}
      <Button size="xs" variant="outline" color="red">
        Withdraw Application
      </Button>
    </Group>
  );
};

export default ApplicationActions;
