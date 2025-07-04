import * as React from "react";
import type { PiletApi } from "@hive/esm-shell-app";
import {
  ListingApplications,
  OrganizationApplications,
  OrganizationRentalAgreements,
  OrganizationTenants,
  PropertyTenancyHistory,
} from "./pages";
import { HeaderLink } from "@hive/esm-core-components";
import { useListingChartListing, usePropertyChartProperty } from "./hooks";

export function setup(app: PiletApi) {
  app.registerPage(
    "/dashboard/tenants",
    () => <OrganizationTenants launchWorkspace={app.launchWorkspace} />,
    {
      layout: "dashboard",
    }
  );
  app.registerPage(
    "/dashboard/applications",
    () => <OrganizationApplications />,
    {
      layout: "dashboard",
    }
  );
  app.registerPage(
    "/dashboard/rental-agreements",
    () => <OrganizationRentalAgreements />,
    {
      layout: "dashboard",
    }
  );
  app.registerPage(
    "/dashboard/properties/:propertyId/tenancy-history",
    () => <PropertyTenancyHistory launchWorkspace={app.launchWorkspace} />,
    {
      layout: "propertyChart",
    }
  );
  app.registerPage(
    "/dashboard/listings/:listingId/applications",
    () => <ListingApplications launchWorkspace={app.launchWorkspace} />,
    {
      layout: "listingChart",
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
    ({ onClose }: any) => (
      <HeaderLink
        label="Applications"
        to="/dashboard/applications"
        icon="homeQuestion"
        onClose={onClose ?? (() => {})}
      />
    ),
    { type: "admin" }
  );
  app.registerMenu(
    ({ onClose }: any) => (
      <HeaderLink
        label="Agreements"
        to="/dashboard/rental-agreements"
        icon="contract"
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
  app.registerMenu(
    ({ onClose }: any) => {
      const listingId = useListingChartListing();
      return (
        <HeaderLink
          label="Applications"
          to={`/dashboard/listings/${listingId}/applications`}
          onClose={onClose ?? (() => {})}
        />
      );
    },
    { type: "listingChart" as any }
  );
}
