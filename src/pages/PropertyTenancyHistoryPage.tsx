import { PiletApi } from "@hive/esm-shell-app";
import React, { FC } from "react";
import { useParams } from "react-router";
import { useTenancyAgreements } from "../hooks";

type Props = Pick<PiletApi, "launchWorkspace">;

const PropertyTenancyHistoryPage: FC<Props> = ({ launchWorkspace }) => {
  const { propertyId } = useParams<{ propertyId: string }>();
  const agreementsAsync = useTenancyAgreements();
  return <div>PropertyTenancyHistoryPage for property {propertyId}</div>;
};

export default PropertyTenancyHistoryPage;
