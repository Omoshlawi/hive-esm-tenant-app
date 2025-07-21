import {
  Button,
  Checkbox,
  Group,
  NumberInput,
  Stack,
  Title,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import React, { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TenancyAgreementFormData } from "../../types";
import { INPUT_ORDER } from "../../utils/constants";
type Props = {
  onNext?: () => void;
  onCancel?: () => void;
};
const BasicsStep: FC<Props> = ({ onCancel, onNext }) => {
  const form = useFormContext<TenancyAgreementFormData>();

  return (
    <Stack h={"100%"} justify="space-between">
      <Stack gap={"md"}>
        <Title order={4} pt={"lg"}>
          Basic Information
        </Title>
        <Controller
          control={form.control}
          name="startDate"
          render={({ field, fieldState }) => (
            <DateInput
              {...field}
              label="Start Date"
              description="Must be a future time"
              inputWrapperOrder={INPUT_ORDER}
              error={fieldState.error?.message}
              placeholder="dd/mm/yyyy"
            />
          )}
        />
        <Controller
          control={form.control}
          name="endDate"
          render={({ field, fieldState }) => (
            <DateInput
              {...field}
              label="End Date"
              description="Must be a future time"
              inputWrapperOrder={INPUT_ORDER}
              error={fieldState.error?.message}
              placeholder="dd/mm/yyyy"
            />
          )}
        />
        <Controller
          control={form.control}
          name="baseRentAmount"
          render={({ field, fieldState }) => (
            <NumberInput
              {...field}
              label="Rent Amount"
              description="Amount in Ksh"
              inputWrapperOrder={INPUT_ORDER}
              error={fieldState.error?.message}
              placeholder="Enter amount"
            />
          )}
        />
        <Controller
          control={form.control}
          name="noticePeriodDays"
          render={({ field, fieldState }) => (
            <NumberInput
              {...field}
              label="Notice period"
              description={"Period in days"}
              inputWrapperOrder={INPUT_ORDER}
              error={fieldState.error?.message}
              placeholder="Enter notice period"
            />
          )}
        />
        <Controller
          control={form.control}
          name="autoRenewal"
          render={({ field, fieldState }) => (
            <Checkbox
              checked={field.value}
              onChange={(event) => field.onChange(event.currentTarget.checked)}
              label="Enable auto renewal"
              description={"Automatically renew the agreement on expiry"}
              error={fieldState.error?.message}
            />
          )}
        />
        <Controller
          control={form.control}
          name="petsAllowed"
          render={({ field, fieldState }) => (
            <Checkbox
              checked={field.value}
              onChange={(event) => field.onChange(event.currentTarget.checked)}
              label="Pets allowed"
              description={"Allow pets in the property"}
              error={fieldState.error?.message}
            />
          )}
        />
        <Controller
          control={form.control}
          name="smokingAllowed"
          render={({ field, fieldState }) => (
            <Checkbox
              checked={field.value}
              onChange={(event) => field.onChange(event.currentTarget.checked)}
              label="Smoking allowed"
              description={"Allow smoking in the property"}
              error={fieldState.error?.message}
            />
          )}
        />
        <Controller
          control={form.control}
          name="sublettingAllowed"
          render={({ field, fieldState }) => (
            <Checkbox
              checked={field.value}
              onChange={(event) => field.onChange(event.currentTarget.checked)}
              label="Subletting allowed"
              description={"Allow subletting of the property"}
              error={fieldState.error?.message}
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
              "startDate",
              "endDate",
              "autoRenewal",
              "baseRentAmount",
              "noticePeriodDays",
              "petsAllowed",
              "smokingAllowed",
              "sublettingAllowed",
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

export default BasicsStep;
