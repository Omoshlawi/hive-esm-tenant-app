import * as React from "react";
import type { PiletApi } from "@hive/esm-shell-app";
import { OrganizationTenants, PropertyTenancyHistory } from "./pages";
import { HeaderLink } from "@hive/esm-core-components";
import { usePropertyChartProperty } from "./hooks";

export function setup(app: PiletApi) {
  app.registerPage("/dashboard/tenants", OrganizationTenants, {
    layout: "dashboard",
  });
  app.registerPage(
    "/dashboard/properties/:propertyId/tenancy-history",
    () => <PropertyTenancyHistory launchWorkspace={app.launchWorkspace} />,
    {
      layout: "propertyChart",
    }
  );
  app.registerMenu(
    ({ onClose }: any) => (
      <HeaderLink
        label="Tenants"
        to="/dashboard/tenants"
        icon="users"
        onClose={onClose ?? (() => {})}
      />
    ),
    { type: "admin" }
  );
  app.registerMenu(
    ({ onClose }: any) => {
      const propertyId = usePropertyChartProperty();
      return (
        <HeaderLink
          label="Tenancy history"
          to={`/dashboard/properties/${propertyId}/tenancy-history`}
          onClose={onClose ?? (() => {})}
        />
      );
    },
    { type: "propertyChart" as any }
  );
}
