import { withUserAccess } from "@hive/esm-core-components";
import OrganizationTenantsPage from "./OrganizationTenantsPage";
import PropertyTenancyHistoryPage from "./PropertyTenancyHistoryPage";
import ListingApplicationsPage from "./ListingApplicationsPage";
export const OrganizationTenants = withUserAccess(OrganizationTenantsPage, {
  isAuthenticated: (session) => session.isAuthenticated,
  requiresAuth: true,
});

export const PropertyTenancyHistory = withUserAccess(
  PropertyTenancyHistoryPage,
  { isAuthenticated: (session) => session.isAuthenticated, requiresAuth: true }
);
export const ListingApplications = withUserAccess(ListingApplicationsPage, {
  isAuthenticated: (session) => session.isAuthenticated,
  requiresAuth: true,
});
