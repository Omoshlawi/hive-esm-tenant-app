import { withUserAccess } from "@hive/esm-core-components";
import OrganizationTenantsPage from "./OrganizationTenantsPage";
export const OrganizationTenants = withUserAccess(OrganizationTenantsPage, {
  isAuthenticated: (session) => session.isAuthenticated,
  requiresAuth: true,
});
