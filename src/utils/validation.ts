import z from "zod";
import { PHONE_NUMBER_REGEX } from "./constants";

export const PersonSearchCreateValidator = z.object({
  mode: z.enum(["search", "create"]),
  personId: z.string().nonempty().uuid("Invalid").optional(),
  personInfo: z
    .object({
      firstName: z.string().nonempty(),
      lastName: z.string().nonempty(),
      surname: z.string().optional(),
      email: z.string().email(),
      phoneNumber: z.string(),
      avatarUrl: z.string().optional(),
      gender: z.enum(["Male", "Female", "Unknown"]).optional(),
    })
    .optional(),
});

export const TenantValidator = z
  .object({
    personId: z.string().nonempty().uuid("Invalid"),
    tenantType: z.enum([
      "INDIVIDUAL",
      "COUPLE",
      "FAMILY",
      "ROOMMATES",
      "CORPORATE",
    ]),
    // monthlyIncome: z.number({ coerce: true }).nonnegative().optional(),
    // employmentStatus: z
    //   .enum([
    //     "EMPLOYED_FULL_TIME",
    //     "EMPLOYED_PART_TIME",
    //     "SELF_EMPLOYED",
    //     "UNEMPLOYED",
    //     "RETIRED",
    //     "STUDENT",
    //     "CONTRACTOR",
    //   ])
    //   .optional(),
    emergencyContactName: z.string().optional(),
    emergencyContactPhone: z.string().optional(),
    emergencyContactEmail: z.string().email().optional(),
    emergencyContactRelation: z.string().email().optional(),
    preferredContactMethod: z
      .enum(["EMAIL", "PHONE", "SMS", "MAIL"])
      .optional(),
    languagePreference: z.string().optional(),
    specialRequirements: z.string().optional(),
    internalNotes: z.string().optional(),
    tags: z.string().nonempty().array().optional(),
  })
  .merge(PersonSearchCreateValidator);

export const TenenantReferenceValidator = z.object({
  referenceType: z.enum([
    "PERSONAL",
    "PROFESSIONAL",
    "PREVIOUS_LANDLORD",
    "EMPLOYER",
    "CHARACTER",
  ]),
  name: z.string().nonempty(),
  relationship: z.string().nonempty(),
  phoneNumber: z.string().regex(PHONE_NUMBER_REGEX).optional(),
  email: z.string().email().optional(),
  company: z.string().optional(),
  position: z.string().optional(),
});

export const CoApplicantValidator = z.object({
  personId: z.string().nonempty().uuid("Invalid"),
  relationshipType: z.string().nonempty(),
});
export const RentalApplicationValidator = z.object({
  personId: z.string().nonempty().uuid("Invalid"),
  listingId: z.string().nonempty().uuid("Invalid"),
  desiredMoveInDate: z.date({ coerce: true }),
  leaseTerm: z.number({ coerce: true }).nonnegative().optional(),
  proposedRent: z.number({ coerce: true }).nonnegative().optional(),
  securityDeposit: z.number({ coerce: true }).nonnegative().optional(),
  petDetails: z.string().optional(),
  vehicleInfo: z.string().optional(),
  coApplicants: CoApplicantValidator.array().optional(),
  references: TenenantReferenceValidator.array().optional(),
});
