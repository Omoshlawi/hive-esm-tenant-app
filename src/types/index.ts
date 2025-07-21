import { z } from "zod";
import {
  AdditionalChargeValidator,
  AgreementParticipantValudator,
  CoApplicantValidator,
  LeaseAgreementDetailsValidator,
  Personvalidator,
  RentalAgreementDetailsValidator,
  TenancyAgreementValidator,
  TenancyApplicationValidator,
  ShortTermAgreementDetailsValidator,
  TenantValidator,
  TenenantReferenceValidator,
} from "../utils/validation";
import { Person } from "@hive/esm-core-api";
import { PiletApi } from "@hive/esm-shell-app";

export interface Listing {
  id: string;
  propertyId: string;
  property: Property;
  organizationId: string;
  organization: Organization;
  tags: any[];
  status:
    | "DRAFT"
    | "PENDING"
    | "BLOCKED"
    | "APPROVED"
    | "REJECTED"
    | "UNDER_CONTRACT"
    | "SOLD"
    | "LEASED"
    | "RENTED"
    | "WITHDRAWN"
    | "EXPIRED";
  title: string;
  description: any;
  type:
    | "RENTAL"
    | "SALE"
    | "LEASE"
    | "AUCTION"
    | "RENT_TO_OWN"
    | "SHORT_TERM"
    | "CO_LIVING";
  coverImage?: string;
  price: string;
  listedDate: string;
  expiryDate: any;
  featured: boolean;
  contactPersonId: string;
  metadata: Metadata;
  views: number;
  createdBy: string;
  voided: boolean;
  createdAt: string;
  updatedAt: string;
  saleDetails?: SaleDetails;
  media?: Array<ListingMedia>;
  additionalCharges?: Array<ListingCharge>;
}

export type ChargeFrequency =
  | "ONE_TIME"
  | "MONTHLY"
  | "WEEKLY"
  | "PER_NIGHT"
  | "ANNUALLY";

export interface ListingCharge {
  id: string;
  listingId: string;
  listing?: Listing;

  name: string; // e.g., "Cleaning Fee", "Pet Fee", "Parking"
  description?: string;
  amount: number;
  frequency: ChargeFrequency;
  mandatory: boolean;

  metadata?: any;
  voided: boolean;

  createdAt: string;
  updatedAt: string;
}

export interface Property {
  id: string;
  name: string;
  address?: Address;
  thumbnail: string;
  addressId: string;
  status: string;
}

export interface Address {
  id: string;
  name: string;
  ward: string;
  county: string;
  village?: string;
  landmark: string;
  latitude?: string;
  metadata?: Record<string, any>;
  longitude?: string;
  subCounty: string;
  postalCode: string;
  description: string;
}

export interface Organization {
  id: string;
  name: string;
  description: string;
}

export interface Metadata {
  amenities: string[];
  attributes: Attributes;
  categories: string[];
}

export interface Attributes {
  [attribiteNameOrId: string]: string;
}

export interface SaleDetails {
  id: string;
  listingId: string;
  downPayment?: string;
  priceNegotiable: boolean;
  titleDeedReady: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface OwnershipType {
  id: string;
  name: string;
  description?: string;
  voided: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface FinancingOption {
  id: string;
  name: string;
  description?: string;
  voided: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface ListingMedia {
  id: string;
  listingId: string;
  tags?: string[];
  title?: string;
  description?: string;
  url?: string;
  order?: number;
  documentPurpose?: string;
  mediaType:
    | "IMAGE"
    | "VIDEO"
    | "DOCUMENT"
    | "FLOOR_PLAN"
    | "LEGAL_DOC"
    | "CONTRACT"
    | "OTHER";
  metadata?: {
    size?: number;
    memeType?: string;
    id: string;
  };
}

export interface ListingStatus {
  id: string;
  listingId: string;
  previousStatus: string;
  newStatus: string;
  changedBy?: string;
  reason?: string;
  createdAt: string;
}

export interface ListingFilterParams {
  page: number;
  pageSize: number;
  search: string;
  isActive: boolean;
  tags: string[];
  sortBy: "newest" | "oldest" | "price-low" | "price-high" | "views";
  view: "grid" | "list";
  types: Array<Listing["type"]>;
}

export interface TenancyAgreement {
  id: string;
  organizationId: string;
  propertyId: string;
  applicationId: string;
  agreementNumber: string;
  agreementType:
    | "RENTAL"
    | "LEASE"
    | "RENT_TO_OWN"
    | "SHORT_TERM"
    | "CORPORATE"
    | "SUBLEASE"
    | "COMMERCIAL"
    | "STUDENT"
    | "SENIOR";
  status: AgreementStatus;
  startDate: string;
  endDate?: string;
  baseRentAmount: string;
  typeSpecificData?: Record<string, any>;
  noticePeriodDays: number;
  autoRenewal: boolean;
  petsAllowed: boolean;
  smokingAllowed: boolean;
  sublettingAllowed: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy?: string;
  metadata?: any;
  voided: boolean;
  participants?: Array<TenancyAgreementParticipant>;
  additionalCharges?: Array<TenancyAgreementAdditionalCharge>;
  leaseDetails?: LeaseDetails;
  rentalDetails?: RentalDetails;
  shortTermDetails?: ShortTermDetails;
  statusHistory?: Array<AgreementStatusHistory>;
}

export type AgreementStatus =
  | "DRAFT"
  | "PENDING"
  | "ACTIVE"
  | "EXPIRED"
  | "TERMINATED"
  | "RENEWED"
  | "CANCELLED"
  | "SUSPENDED";
export interface AgreementStatusHistory {
  id: string;
  agreementId: String;
  agreement: TenancyAgreement;
  previousStatus: AgreementStatus;
  newStatus: AgreementStatus;
  changedBy?: string;
  reason?: string;
  createdAt: string;
}
export interface RentalDetails {
  id: string;
  agreementId: string;
}

export interface ShortTermDetails {
  id: string;
  agreementId: string;
}

export interface LeaseDetails {
  id: string;
  agreementId: string;
  leaseTerm: number;
  renewalOptions: null;
  rentEscalation: null;
  maintenanceTerms: null;
  leaseCompliance: null;
  createdAt: string;
  updatedAt: string;
}
export interface TenancyAgreementParticipant {
  id: string;
  agreementId: string;
  organizationId: string;
  tenantId: string;
  tenant?: Tenant;
  participantType:
    | "CO_TENANT"
    | "PRIMARY_TENANT"
    | "GUARANTOR"
    | "OCCUPANT"
    | "SUBLESSEE"
    | "AUTHORIZED_OCCUPANT";
  responsibilityPercentage?: string;
  status: "ACTIVE" | "TERMINATED" | "EXPIRED" | "PENDING" | "SUSPENDED";
  moveInDate: string;
  moveOutDate?: string;
  participantTerms?: any;
  createdAt: string;
  updatedAt: string;
  metadata?: Record<string, any>;
}

export interface TenancyAgreementAdditionalCharge {
  id: string;
  agreementId: string;
  name: string;
  description?: string;
  amount: string;
  frequency:
    | "ONE_TIME"
    | "DAILY"
    | "WEEKLY"
    | "MONTHLY"
    | "QUARTERLY"
    | "ANNUALLY"
    | "PER_NIGHT"
    | "PER_STAY";
  mandatory: boolean;
  dueDate?: string;
  chargeMetadata?: Record<string, any>;
  voided: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TenancyApplication {
  id: string;
  organizationId: string;
  personId: string;
  propertyId: string;
  listingId: string;
  applicationNumber: string;
  status:
    | "DRAFT"
    | "PENDING"
    | "UNDER_REVIEW"
    | "APPROVED"
    | "REJECTED"
    | "WITHDRAWN"
    | "EXPIRED"
    | "CONDITIONAL_APPROVAL";
  desiredMoveInDate: string;
  leaseTerm?: number;
  proposedRent?: number;
  securityDeposit?: number;
  petDetails?: string;
  vehicleInfo?: string;
  screeningScore?: string;
  manualReviewNeeded: boolean;
  assignedToUser?: string;
  internalNotes?: string;
  backgroundCheckStatus: string;
  backgroundCheckDate?: string;
  identityVerified: boolean;
  incomeVerified: boolean;
  createdAt: string;
  updatedAt: string;
  person?: Person;
  voided: boolean;
}

export interface TenancyApplicationReference {
  id: string;
  applicationId: string;
  referenceType: string;
  name: string;
  relationship: string;
  phoneNumber: string;
  email: string;
  company?: string;
  position?: string;
  contacted: boolean;
  contactedDate?: string;
  response?: string;
  recommendation?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TenancyApplicationCoApplicants {
  id: string;
  applicationId: string;
  personId: string;
  relationshipType: string;
  createdAt: string;
  updatedAt: string;
  person?: Person;
}

export interface Tenant {
  id: string;
  personId: string;
  person: Pick<
    Person,
    | "id"
    | "avatarUrl"
    | "firstName"
    | "lastName"
    | "email"
    | "gender"
    | "name"
    | "phoneNumber"
    | "surname"
  >;
  organizationId: string;
  organization?: any;
  tenantNumber: string;
  tenantType: "INDIVIDUAL" | "COUPLE" | "FAMILY" | "ROOMMATES" | "CORPORATE";
  status: "ACTIVE" | "INACTIVE" | "BLACKLISTED";
  creditScore?: number;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactEmail?: string;
  emergencyContactRelation?: string;
  preferredContactMethod: "EMAIL" | "PHONE" | "SMS" | "MAIL" | "IN_PERSON";
  languagePreference?: string;
  specialRequirements?: string;
  internalNotes?: string;
  tags: Array<string>;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  voided: boolean;
}

export type TenancyApplicationFormData = z.infer<
  typeof TenancyApplicationValidator
>;
export type PersonFormData = z.infer<typeof Personvalidator>;

export type CoApplicantFormData = z.infer<typeof CoApplicantValidator>;
export type TenenantReferenceFormData = z.infer<
  typeof TenenantReferenceValidator
>;
export type TenantFormData = z.infer<typeof TenantValidator>;
export type TenancyAgreementFormData = z.infer<
  typeof TenancyAgreementValidator
>;
export type ShortTermAgreementDetailsFormData = z.infer<
  typeof ShortTermAgreementDetailsValidator
>;
export type RentalAgreementDetailsFormData = z.infer<
  typeof RentalAgreementDetailsValidator
>;
export type LeaseAgreementDetailsFormData = z.infer<
  typeof LeaseAgreementDetailsValidator
>;
export type TenancyAgreementParticipantFormData = z.infer<
  typeof AgreementParticipantValudator
>;
export type TenancyAgreementAdditionalChargeFormdata = z.infer<
  typeof AdditionalChargeValidator
>;
export type PropsWithLaunchWorkspace = Pick<PiletApi, "launchWorkspace">;
export type PropsWithExtension = Pick<PiletApi, "Extension">;
