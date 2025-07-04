import React, { FC } from "react";
import { Tenant } from "../types";
type Props = {
  tenant?: Tenant;
  onSuccess?: (tenant: Tenant) => void;
  onCloseWorkspace?: () => void;
};

const TenantForm:FC<Props> = ({onCloseWorkspace,onSuccess,tenant}) => {
  return <div>TenantForm</div>;
};

export default TenantForm;
