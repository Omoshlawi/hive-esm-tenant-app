import { handleApiErrors } from "@hive/esm-core-api";
import { Loader, Alert, Table } from "@mantine/core";
import React, { FC } from "react";
import {
  useTenancyApplication,
  useTenancyApplicationCoApplicants,
} from "../../hooks";
type Props = { applicationId: string };

const CoApplicantsTab: FC<Props> = ({ applicationId }) => {
  const { coApplicants, error, isLoading } =
    useTenancyApplicationCoApplicants(applicationId);
  if (isLoading) return <Loader />;
  if (error)
    return (
      <Alert
        color="red"
        variant="light"
        title="Error retreving application"
        withCloseButton
      >
        {handleApiErrors(error)?.detail}
      </Alert>
    );

  return (
    <Table
      data={{
        head: ["Name", "Relationship", "Phone Number", "Email"],
        body: coApplicants.map((reference) => {
          return [
            reference.person?.name,
            reference.relationshipType,
            reference.person?.phoneNumber ?? "--",
            reference.person?.email ?? "--",
          ];
        }),
      }}
    />
  );
};

export default CoApplicantsTab;
