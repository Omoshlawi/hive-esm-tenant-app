import { withUserAccess } from "@hive/esm-core-components";
import OrganizationTenantsPage from "./OrganizationTenantsPage";
import PropertyTenancyHistoryPage from "./PropertyTenancyHistoryPage";
import ListingApplicationsPage from "./ListingApplicationsPage";
import OrganizationApplicationsPage from "./OrganizationApplicationsPage";
import OrganizationRentalAgreementsPage from "./OrganizationRentalAgreementsPage";
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

export const OrganizationApplications = withUserAccess(
  OrganizationApplicationsPage,
  { isAuthenticated: (session) => session.isAuthenticated, requiresAuth: true }
);

export const OrganizationRentalAgreements = withUserAccess(
  OrganizationRentalAgreementsPage,
  { isAuthenticated: (session) => session.isAuthenticated, requiresAuth: true }
);
