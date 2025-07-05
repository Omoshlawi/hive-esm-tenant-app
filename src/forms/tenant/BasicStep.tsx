import {
  Button,
  Group,
  Select,
  Stack,
  TagsInput,
  Textarea,
  Title,
} from "@mantine/core";
import React, { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TenantFormData } from "../../types";
import { INPUT_ORDER } from "../../utils/constants";
import PersonInput from "../common/PersonInput";
type Props = {
  onNext?: () => void;
  onCancel?: () => void;
};
const BasicStep: FC<Props> = ({ onCancel, onNext }) => {
  const form = useFormContext<TenantFormData>();

  return (
    <Stack h={"100%"} justify="space-between">
      <Stack gap={"md"}>
        <Title order={4} pt={"lg"}>
          Basic Information
        </Title>
        <PersonInput control={form.control} name="personId" />
        <Controller
          control={form.control}
          name="tenantType"
          render={({ field, fieldState }) => (
            <Select
              {...field}
              label="Tenant type"
              data={[
                { label: "Individual", value: "INDIVIDUAL" },
                { label: "Couple", value: "COUPLE" },
                { label: "Family", value: "FAMILY" },
                { label: "Room mates", value: "ROOMMATES" },
                { label: "Corperate", value: "CORPORATE" },
              ]}
              // description="Must be a future time"
              inputWrapperOrder={INPUT_ORDER}
              error={fieldState.error?.message}
              placeholder="Select tenant type"
            />
          )}
        />
        <Controller
          control={form.control}
          name="tags"
          render={({ field, fieldState }) => (
            <TagsInput
              {...field}
              label="Tags"
              description="Categorizes tenant"
              inputWrapperOrder={INPUT_ORDER}
              error={fieldState.error?.message}
              placeholder="Enter tags ..."
            />
          )}
        />
        <Controller
          control={form.control}
          name="specialRequirements"
          render={({ field, fieldState }) => (
            <Textarea
              {...field}
              label="Accecibility needs"
              description="Special requirements"
              inputWrapperOrder={INPUT_ORDER}
              error={fieldState.error?.message}
              placeholder="Requirements ..."
            />
          )}
        />
        <Controller
          control={form.control}
          name="preferredContactMethod"
          render={({ field, fieldState }) => (
            <Select
              {...field}
              label="Contact method"
              data={[
                { label: "Email", value: "EMAIL" },
                { label: "Phone", value: "PHONE" },
                { label: "SMS", value: "SMS" },
                { label: "Mail", value: "MAIL" },
              ]}
              description="Prefered contact method"
              inputWrapperOrder={INPUT_ORDER}
              error={fieldState.error?.message}
              placeholder="Select one"
            />
          )}
        />
        <Controller
          control={form.control}
          name="languagePreference"
          render={({ field, fieldState }) => (
            <Select
              {...field}
              label="Prefered language"
              data={[
                { label: "English", value: "EN" },
                { label: "Kiswahili", value: "SW" },
              ]}
              description="Prefered contact method"
              inputWrapperOrder={INPUT_ORDER}
              error={fieldState.error?.message}
              placeholder="Select one"
            />
          )}
        />
        <Controller
          control={form.control}
          name="internalNotes"
          render={({ field, fieldState }) => (
            <Textarea
              {...field}
              label="Notes"
              description="Internal notes"
              inputWrapperOrder={INPUT_ORDER}
              error={fieldState.error?.message}
              placeholder="Notes ..."
            />
          )}
        />
      </Stack>
      <Group gap={1}>
        <Button flex={1} variant="default" radius={0} onClick={onCancel}>
          Cancel
        </Button>
        <Button
          radius={0}
          flex={1}
          fullWidth
          type={"button"}
          variant="filled"
          loading={form.formState.isSubmitting}
          disabled={form.formState.isSubmitting}
          onClick={async () => {
            const valid = await form.trigger([
              "tags",
              "tenantType",
              "specialRequirements",
              "preferredContactMethod",
              "languagePreference",
              "internalNotes",
              "personId",
            ]);
            if (valid) onNext?.();
          }}
        >
          Next
        </Button>
      </Group>
    </Stack>
  );
};

export default BasicStep;
