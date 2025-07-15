import { Alert, Loader, Table } from "@mantine/core";
import React, { FC } from "react";
import { useRentalApplication } from "../../hooks";
import { handleApiErrors } from "@hive/esm-core-api";
type Props = { applicationId: string };
const DetailsTab: FC<Props> = ({ applicationId }) => {
  const { application, error, isLoading } = useRentalApplication(applicationId);
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
        body: [
          ["Application number", application.applicationNumber],
          ["Applicant", application.person.name ?? application.person.email],
          ["Mannual review needed", `${application.manualReviewNeeded}`],
          ["Pet details", application.petDetails ?? "--"],
          ["Vehicle details", application.vehicleInfo ?? "--"],
          ["Screening score", application.screeningScore ?? "--"],
          ["Internal notes", application.internalNotes ?? "--"],
          [
            "Background check status",
            application.backgroundCheckStatus ?? "--",
          ],
          ["identity verified", `${application.identityVerified}`],
          ["income verified", `${application.incomeVerified}`],
        ],
      }}
    />
  );
};

export default DetailsTab;
