import { Group, Button, Alert, Text } from "@mantine/core";
import React, { FC } from "react";
import { useRentalApplication, useRentalApplicationApi } from "../../hooks";
import { handleApiErrors } from "@hive/esm-core-api";
import { closeModal, openConfirmModal, openModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { PropsWithLaunchWorkspace } from "../../types";
import AgreementForm from "../../forms/AgreementForm";

type Props = PropsWithLaunchWorkspace & {
  applicationId: string;
};

const ApplicationActions: FC<Props> = ({ applicationId, launchWorkspace }) => {
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

  const handleCreateRentalAgreement = () => {
    const dispose = launchWorkspace(
      <AgreementForm
        onCloseWorkspace={() => dispose()}
        applicationId={applicationId}
      />,
      {
        title: "Create Rental Agreement",
        width: "extra-wide",
        expandable: true,
      }
    );
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
        <Button
          size="xs"
          variant="outline"
          color="teal"
          onClick={handleCreateRentalAgreement}
        >
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
