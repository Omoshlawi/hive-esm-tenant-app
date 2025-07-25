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
import { useTenantApi } from "../hooks";
import { Tenant, TenantFormData } from "../types";
import { TenantValidator } from "../utils/validation";
import { BasicStep, EmergencyContactStep } from "./tenant";
type Props = {
  tenant?: Tenant;
  onSuccess?: (tenant: Tenant) => void;
  onCloseWorkspace?: () => void;
};

type FormSteps = "basic" | "emmergency";

const TenantForm: FC<Props> = ({ onCloseWorkspace, onSuccess, tenant }) => {
  const { addTenant, updateTenant, mutateTenants } = useTenantApi();

  const form = useForm<TenantFormData>({
    defaultValues: {
      //   title: appointment?.title,
      //   description: listing?.description,
      //   expiryDate: listing?.expiryDate,
      //   featured: listing?.featured,
      //   tags: listing?.tags ?? [],
      //   price: listing?.price ? Number(listing.price) : undefined,
      //   type: listing?.type,
    },
    resolver: zodResolver(TenantValidator as any),
  });

  const navigateToErrorStep = useCallback(() => {
    const fieldSteps: Record<FormSteps, Array<FieldPath<TenantFormData>>> = {
      basic: [
        "tags",
        "tenantType",
        "specialRequirements",
        "preferredContactMethod",
        "languagePreference",
        "internalNotes",
        "personId",
      ],
      emmergency: [
        "emergencyContactEmail",
        "emergencyContactName",
        "emergencyContactPhone",
        "emergencyContactRelation",
      ],
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

  const onSubmit: SubmitHandler<TenantFormData> = async (data) => {
    try {
      const res = tenant
        ? await updateTenant(tenant?.id, data)
        : await addTenant(data);
      onSuccess?.(res);
      onCloseWorkspace?.();
      mutateTenants();
      showNotification({
        title: "Success",
        message: `Tenant ${tenant ? "updated" : "created"} successfully`,
        color: "teal",
      });
    } catch (error) {
      const e = handleApiErrors<TenantFormData>(error);
      if (e.detail) {
        showNotification({ title: "Error", message: e.detail, color: "red" });
      } else {
        // Set all backend validation errors
        Object.entries(e).forEach(([key, val]) =>
          form.setError(key as keyof TenantFormData, { message: val })
        );
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
                Basic info
              </Tabs.Tab>

              <Tabs.Tab p={"lg"} value={"emmergency"}>
                Contact Info
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value={"basic"} p={"sm"}>
              <BasicStep
                onCancel={onCloseWorkspace}
                onNext={() => setActiveTab("emmergency")}
              />
            </Tabs.Panel>
            <Tabs.Panel value={"emmergency"} p={"sm"}>
              <EmergencyContactStep onPrev={() => setActiveTab("basic")} />
            </Tabs.Panel>
          </Tabs>
        </Paper>
      </form>
    </FormProvider>
  );
};

export default TenantForm;
