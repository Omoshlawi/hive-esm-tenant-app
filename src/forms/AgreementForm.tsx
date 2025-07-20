import React, { FC } from "react";
import { RentalAgreement } from "../types";

type Props = {
  agreement?: RentalAgreement;
  onSuccess?: (agreement: RentalAgreement) => void;
  onCloseWorkspace?: () => void;
};
const AgreementForm: FC<Props> = ({
  agreement,
  onCloseWorkspace,
  onSuccess,
}) => {
  return <div>AgreementForm</div>;
};

export default AgreementForm;
