import { handleApiErrors } from "@hive/esm-core-api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMediaQuery } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import React, { FC, useCallback, useState } from "react";
import {
  FieldPath,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { useTenancyAgreementApi } from "../hooks";
import { TenancyAgreement, TenancyAgreementFormData } from "../types";
import { TenancyAgreementValidator } from "../utils/validation";
import { Paper, Tabs } from "@mantine/core";
import {
  BasicsStep,
  ParticipantsStep,
  TypeDetailsStep,
  AdditionalChargesStep,
} from "./agreement";
type Props = {
  agreement?: TenancyAgreement;
  onSuccess?: (agreement: TenancyAgreement) => void;
  onCloseWorkspace?: () => void;
  applicationId: string;
};

type FormSteps =
  | "basics"
  | "type-details"
  | "participants"
  | "additional-charges";

const AgreementForm: FC<Props> = ({
  agreement,
  onCloseWorkspace,
  onSuccess,
  applicationId,
}) => {
  const { addAgreement, updateAgreement, mutateAgreements } =
    useTenancyAgreementApi();
  const form = useForm<TenancyAgreementFormData>({
    defaultValues: {
      //   title: appointment?.title,
      //   description: listing?.description,
      //   expiryDate: listing?.expiryDate,
      //   featured: listing?.featured,
      //   tags: listing?.tags ?? [],
      //   price: listing?.price ? Number(listing.price) : undefined,
      //   type: listing?.type,
      applicationId: applicationId,
    },
    resolver: zodResolver(TenancyAgreementValidator),
  });

  const navigateToErrorStep = useCallback(() => {
    const fieldSteps: Record<
      FormSteps,
      Array<FieldPath<TenancyAgreementFormData>>
    > = {
      basics: [
        "applicationId",
        "startDate",
        "endDate",
        "autoRenewal",
        "baseRentAmount",
        "noticePeriodDays",
        "petsAllowed",
        "smokingAllowed",
        "sublettingAllowed",
      ],
      "type-details": [
        "agreementType",
        "leaseDetails",
        "leaseDetails.leaseTerm",
        "shortTermDetails",
        "shortTermDetails.checkInTime",
        "shortTermDetails.checkOutTime",
        "shortTermDetails.guestCapacity",
        "rentalDetails",
        "rentalDetails.minimumStay",
      ],
      participants: ["participants"],
      "additional-charges": ["additionalCharges"],
    };

    for (const [step, fields] of Object.entries(fieldSteps)) {
      const hasError = fields.some(
        (field) => form.getFieldState(field as any).invalid
      );

      if (hasError) {
        setActiveTab(step as FormSteps);
        break;
      }
    }
  }, [form]);

  const isMobile = useMediaQuery("(max-width: 48em)");
  const [activeTab, setActiveTab] = useState<FormSteps | null>("basics");

  // Navigate to error step when form errors change
  React.useEffect(() => {
    if (Object.keys(form.formState.errors ?? {}).length > 0) {
      navigateToErrorStep();
    }
  }, [form.formState.errors, navigateToErrorStep]);
  const onSubmit: SubmitHandler<TenancyAgreementFormData> = async (data) => {
    try {
      const res = agreement
        ? await updateAgreement(agreement?.id, data)
        : await addAgreement(data);
      onSuccess?.(res);
      onCloseWorkspace?.();
      mutateAgreements();
      showNotification({
        title: "Success",
        message: `Agreement ${agreement ? "updated" : "created"} successfully`,
        color: "teal",
      });
    } catch (error) {
      const e = handleApiErrors<TenancyAgreementFormData>(error);
      if (e.detail) {
        showNotification({ title: "Error", message: e.detail, color: "red" });
      } else {
        // Set all backend validation errors
        Object.entries(e).forEach(([key, val]) => {
          if (key === "listingId")
            showNotification({
              color: "red",
              title: "Invalid listing",
              message: val,
            });
          else
            form.setError(key as keyof TenancyAgreementFormData, {
              message: val,
            });
        });

        setTimeout(() => {
          // Without setTimeout - runs immediately in same stack:
          navigateToErrorStep();
        }, 0);
      }
    }
  };
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Paper p={"md"} flex={1} h={"100%"}>
          <Tabs
            orientation={isMobile ? "horizontal" : "vertical"}
            variant="default"
            h={"100%"}
            value={activeTab}
            onChange={(value) => {
              setActiveTab(value as FormSteps);
            }}
          >
            <Tabs.List justify={isMobile ? "space-between" : undefined}>
              <Tabs.Tab p={"lg"} value={"basics"}>
                Basics
              </Tabs.Tab>
              <Tabs.Tab p={"lg"} value={"type-details"}>
                Type Details
              </Tabs.Tab>
              <Tabs.Tab p={"lg"} value={"participants"}>
                Participants
              </Tabs.Tab>
              <Tabs.Tab p={"lg"} value={"additional-charges"}>
                Additional Charges
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value={"basics"} p={"sm"}>
              <BasicsStep
                onCancel={onCloseWorkspace}
                onNext={() => setActiveTab("type-details")}
              />
            </Tabs.Panel>
            <Tabs.Panel value={"type-details"} p={"sm"}>
              <TypeDetailsStep
                onPrev={() => setActiveTab("basics")}
                onNext={() => setActiveTab("participants")}
              />
            </Tabs.Panel>
            <Tabs.Panel value={"participants"} p={"sm"}>
              <ParticipantsStep
                onPrev={() => setActiveTab("type-details")}
                onNext={() => setActiveTab("additional-charges")}
              />
            </Tabs.Panel>
            <Tabs.Panel value={"additional-charges"} p={"sm"}>
              <AdditionalChargesStep
                onPrev={() => setActiveTab("participants")}
              />
            </Tabs.Panel>
          </Tabs>
        </Paper>
      </form>
    </FormProvider>
  );
};

export default AgreementForm;
