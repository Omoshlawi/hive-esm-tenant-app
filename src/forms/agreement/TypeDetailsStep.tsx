import {
  Button,
  Group,
  NumberInput,
  Select,
  Stack,
  Title,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import React, { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TenancyAgreementFormData } from "../../types";
import { INPUT_ORDER } from "../../utils/constants";
type Props = {
  onNext?: () => void;
  onPrev?: () => void;
};
const TypeDetailsStep: FC<Props> = ({ onNext, onPrev }) => {
  const form = useFormContext<TenancyAgreementFormData>();
  const observableType = form.watch("agreementType");
  return (
    <Stack h={"100%"} justify="space-between">
      <Stack gap={"md"}>
        <Title order={4} pt={"lg"}>
          Type Details
        </Title>
        <Controller
          control={form.control}
          name="agreementType"
          render={({ field, fieldState: { error } }) => (
            <Select
              {...field}
              label="Agreement type"
              data={[
                { label: "Lease", value: "LEASE" },
                { label: "Rental", value: "RENTAL" },
                { label: "Short Term", value: "SHORT_TERM" },
                { label: "Corporate", value: "CORPORATE" },
                { label: "Sublease", value: "SUBLEASE" },
                { label: "Commercial", value: "COMMERCIAL" },
                { label: "Rent to Own", value: "RENT_TO_OWN" },
                { label: "Student", value: "STUDENT" },
                { label: "Senior", value: "SENIOR" },
              ]}
              // description="Must be a future time"
              inputWrapperOrder={INPUT_ORDER}
              error={error?.message}
              placeholder="Select agreement type"
            />
          )}
        />

        {observableType === "LEASE" && (
          <>
            <Controller
              control={form.control}
              name="leaseDetails.leaseTerm"
              render={({ field, fieldState }) => (
                <NumberInput
                  {...field}
                  label="Lease Term"
                  description="Duration in months"
                  inputWrapperOrder={INPUT_ORDER}
                  error={fieldState.error?.message}
                  placeholder="Enter lease term"
                />
              )}
            />
          </>
        )}
        {observableType === "RENTAL" && (
          <>
            <Controller
              control={form.control}
              name="rentalDetails.minimumStay"
              render={({ field, fieldState }) => (
                <NumberInput
                  {...field}
                  label="Minimum Stay"
                  description="Duration in days"
                  inputWrapperOrder={INPUT_ORDER}
                  error={fieldState.error?.message}
                  placeholder="Enter minimum stay"
                />
              )}
            />
          </>
        )}
        {observableType === "SHORT_TERM" && (
          <>
            <Controller
              control={form.control}
              name="shortTermDetails.checkInTime"
              render={({ field, fieldState }) => (
                <DateTimePicker
                  {...field}
                  label="Check-in Time"
                  description="Time when guests can check in"
                  inputWrapperOrder={INPUT_ORDER}
                  error={fieldState.error?.message}
                  placeholder="Select check-in time"
                />
              )}
            />
            <Controller
              control={form.control}
              name="shortTermDetails.checkOutTime"
              render={({ field, fieldState }) => (
                <DateTimePicker
                  {...field}
                  label="Check-out Time"
                  description="Time when guests must check out"
                  inputWrapperOrder={INPUT_ORDER}
                  error={fieldState.error?.message}
                  placeholder="Select check-out time"
                />
              )}
            />
            <Controller
              control={form.control}
              name="shortTermDetails.guestCapacity"
              render={({ field, fieldState }) => (
                <NumberInput
                  {...field}
                  label="Guest Capacity"
                  description="Maximum number of guests allowed"
                  inputWrapperOrder={INPUT_ORDER}
                  error={fieldState.error?.message}
                  placeholder="Enter guest capacity"
                />
              )}
            />
          </>
        )}
      </Stack>
      <Group gap={1}>
        <Button flex={1} variant="default" radius={0} onClick={onPrev}>
          Previous
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
              "agreementType",
              "leaseDetails",
              "leaseDetails.leaseTerm",
              "shortTermDetails",
              "shortTermDetails.checkInTime",
              "shortTermDetails.checkOutTime",
              "shortTermDetails.guestCapacity",
              "rentalDetails",
              "rentalDetails.minimumStay",
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

export default TypeDetailsStep;
