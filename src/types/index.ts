import { z } from "zod";
import {
  CoApplicantValidator,
  RentalApplicationValidator,
  TenantValidator,
  TenenantReferenceValidator,
} from "../utils/validation";

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

export interface RentalAgreement {
  id: string;
}

export interface RentalApplication {
  id: string;
}

export interface Tenant {
  id: string;
}

export type RentalApplicationFormData = z.infer<
  typeof RentalApplicationValidator
>;

export type CoApplicantFormData = z.infer<typeof CoApplicantValidator>;
export type TenenantReferenceFormData = z.infer<
  typeof TenenantReferenceValidator
>;
export type TenantFormData = z.infer<typeof TenantValidator>;
