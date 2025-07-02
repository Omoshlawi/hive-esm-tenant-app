import * as React from "react";
import type { PiletApi } from "@hive/esm-shell-app";
import { OrganizationTenants } from "./pages";
import { HeaderLink } from "@hive/esm-core-components";

export function setup(app: PiletApi) {
  app.registerPage("/dashboard/tenants", OrganizationTenants, {
    layout: "dashboard",
  });
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
}
