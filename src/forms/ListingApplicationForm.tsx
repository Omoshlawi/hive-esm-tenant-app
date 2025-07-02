import React, { FC } from "react";
import { RentalApplication } from "../types";

type Props = {
  application?: RentalApplication;
  onSuccess?: (application: RentalApplication) => void;
  onCloseWorkspace?: () => void;
};

const ListingApplicationForm: FC<Props> = ({
  application,
  onCloseWorkspace,
  onSuccess,
}) => {
  return <div>ListingApplicationForm</div>;
};

export default ListingApplicationForm;
