import { handleApiErrors } from "@hive/esm-core-api";
import { Alert, Loader, Table } from "@mantine/core";
import React, { FC } from "react";
import {
    useRentalApplicationReferences
} from "../../hooks";
type Props = { applicationId: string };

const ReferenceTab: FC<Props> = ({ applicationId }) => {
  const { references, error, isLoading } =
    useRentalApplicationReferences(applicationId);
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
        head: [
          "Reference type",
          "Name",
          "Relationship",
          "Phone Number",
          "Email",
          "Company",
          "Position",
        ],
        body: references.map((reference) => {
          return [
            reference.referenceType,
            reference.name,
            reference.relationship,
            reference.phoneNumber,
            reference.email,
            reference.company,
            reference.position,
          ];
        }),
      }}
    />
  );
};

export default ReferenceTab;
