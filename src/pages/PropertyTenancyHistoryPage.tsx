import { PiletApi } from "@hive/esm-shell-app";
import React, { FC } from "react";
import { useParams } from "react-router";

type Props = Pick<PiletApi, "launchWorkspace">;

const PropertyTenancyHistoryPage: FC<Props> = ({ launchWorkspace }) => {
  const { propertyId } = useParams<{ propertyId: string }>();
  
  return <div>PropertyTenancyHistoryPage for property {propertyId}</div>;
};

export default PropertyTenancyHistoryPage;
