import { HeaderLink } from "@hive/esm-core-components";
import type { PiletApi } from "@hive/esm-shell-app";
import * as React from "react";
import { useListingChartListing, usePropertyChartProperty } from "./hooks";
import {
  AgreementDetail,
  ListingApplications,
  OrganizationApplications,
  OrganizationAgreements,
  OrganizationTenants,
  PropertyAgreements,
} from "./pages";

export function setup(app: PiletApi) {
  app.registerPage(
    "/dashboard/tenants",
    () => <OrganizationTenants launchWorkspace={app.launchWorkspace} />,
    {
      layout: "dashboard",
    }
  );
  app.registerPage(
    "/dashboard/tenancy-applications",
    () => <OrganizationApplications launchWorkspace={app.launchWorkspace} />,
    {
      layout: "dashboard",
    }
  );
  app.registerPage(
    "/dashboard/tenancy-agreements",
    () => <OrganizationAgreements />,
    {
      layout: "dashboard",
    }
  );
  app.registerPage(
    "/dashboard/listings/:listingId/applications",
    () => <ListingApplications launchWorkspace={app.launchWorkspace} />,
    {
      layout: "listingChart",
    }
  );
  app.registerPage(
    "/dashboard/properties/:propertyId/agreements",
    () => <PropertyAgreements launchWorkspace={app.launchWorkspace} />,
    {
      layout: "propertyChart",
    }
  );
  app.registerPage(
    "/dashboard/properties/:propertyId/agreements/:agreementId",
    () => <AgreementDetail launchWorkspace={app.launchWorkspace} />,
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
    ({ onClose }: any) => (
      <HeaderLink
        label="Tenancy Applications"
        to="/dashboard/tenancy-applications"
        icon="homeQuestion"
        onClose={onClose ?? (() => {})}
      />
    ),
    { type: "admin" }
  );
  app.registerMenu(
    ({ onClose }: any) => (
      <HeaderLink
        label="Tenancy Agreements"
        to="/dashboard/tenancy-agreements"
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
          label="Tenancy History"
          to={`/dashboard/properties/${propertyId}/agreements`}
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
