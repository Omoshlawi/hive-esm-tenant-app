import { withUserAccess } from "@hive/esm-core-components";
import OrganizationTenantsPage from "./OrganizationTenantsPage";
import PropertyTenancyHistoryPage from "./PropertyTenancyHistoryPage";
import ListingApplicationsPage from "./ListingApplicationsPage";
import OrganizationApplicationsPage from "./OrganizationApplicationsPage";
import OrganizationAgreementsPage from "./OrganizationAgreementsPage";
import React from "react";
import PropertyAgreementsPage from "./PropertyAgreementsPage";
import AgreementDetailPage from "./AgreementDetailPage";
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

export const OrganizationAgreements = withUserAccess(
  OrganizationAgreementsPage,
  { isAuthenticated: (session) => session.isAuthenticated, requiresAuth: true }
);

export const PropertyAgreements = withUserAccess(PropertyAgreementsPage, {
  isAuthenticated: (session) => session.isAuthenticated,
  requiresAuth: true,
});

export const AgreementDetail = withUserAccess(AgreementDetailPage, {
  isAuthenticated: (session) => session.isAuthenticated,
  requiresAuth: true,
});
