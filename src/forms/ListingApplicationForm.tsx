import { handleApiErrors } from "@hive/esm-core-api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Paper, Tabs } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import React, { FC, useCallback, useState } from "react";
import {
  FieldPath,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { useTenancyApplicationApi } from "../hooks";
import { TenancyApplication, TenancyApplicationFormData } from "../types";
import { TenancyApplicationValidator } from "../utils/validation";
import {
  BasicsFormStep,
  CoApplicantsStep,
  ReferencesStep,
} from "./application";
type Props = {
  listingId: string;
  application?: TenancyApplication;
  onSuccess?: (application: TenancyApplication) => void;
  onCloseWorkspace?: () => void;
};

type FormSteps = "basic" | "co-applicants" | "references";

const ListingApplicationForm: FC<Props> = ({
  application,
  onCloseWorkspace,
  onSuccess,
  listingId,
}) => {
  const { addApplication, updateApplication, mutateApplications } =
    useTenancyApplicationApi();
  const form = useForm<TenancyApplicationFormData>({
    defaultValues: {
      //   title: appointment?.title,
      //   description: listing?.description,
      //   expiryDate: listing?.expiryDate,
      //   featured: listing?.featured,
      //   tags: listing?.tags ?? [],
      //   price: listing?.price ? Number(listing.price) : undefined,
      //   type: listing?.type,
      listingId,
    },
    resolver: zodResolver(TenancyApplicationValidator),
  });

  const navigateToErrorStep = useCallback(() => {
    const fieldSteps: Record<
      FormSteps,
      Array<FieldPath<TenancyApplicationFormData>>
    > = {
      basic: [
        "desiredMoveInDate",
        "desiredMoveInDate",
        "leaseTerm",
        "petDetails",
        "proposedRent",
        "securityDeposit",
        "vehicleInfo",
        "personId",
      ],
      "co-applicants": ["coApplicants"],
      references: ["references"],
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
  const [activeTab, setActiveTab] = useState<FormSteps | null>("basic");

  // Navigate to error step when form errors change
  React.useEffect(() => {
    if (Object.keys(form.formState.errors ?? {}).length > 0) {
      navigateToErrorStep();
    }
  }, [form.formState.errors, navigateToErrorStep]);

  const onSubmit: SubmitHandler<TenancyApplicationFormData> = async (data) => {
    try {
      const res = application
        ? await updateApplication(application?.id, data)
        : await addApplication(data);
      onSuccess?.(res);
      onCloseWorkspace?.();
      mutateApplications();
      showNotification({
        title: "Success",
        message: `Application ${
          application ? "updated" : "created"
        } successfully`,
        color: "teal",
      });
    } catch (error) {
      const e = handleApiErrors<TenancyApplicationFormData>(error);
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
            form.setError(key as keyof TenancyApplicationFormData, {
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
              <Tabs.Tab p={"lg"} value={"basic"}>
                Basic
              </Tabs.Tab>
              <Tabs.Tab p={"lg"} value={"references"}>
                References
              </Tabs.Tab>
              <Tabs.Tab p={"lg"} value={"co-applicants"}>
                Co applicants
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value={"basic"} p={"sm"}>
              <BasicsFormStep
                onCancel={onCloseWorkspace}
                onNext={() => setActiveTab("references")}
              />
            </Tabs.Panel>
            <Tabs.Panel value={"references"} p={"sm"}>
              <ReferencesStep
                onPrev={() => setActiveTab("basic")}
                onNext={() => setActiveTab("co-applicants")}
              />
            </Tabs.Panel>
            <Tabs.Panel value={"co-applicants"} p={"sm"}>
              <CoApplicantsStep onPrev={() => setActiveTab("references")} />
            </Tabs.Panel>
          </Tabs>
        </Paper>
      </form>
    </FormProvider>
  );
};

export default ListingApplicationForm;
