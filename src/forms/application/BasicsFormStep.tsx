import {
  Button,
  Group,
  NumberInput,
  Stack,
  Textarea,
  Title,
} from "@mantine/core";
import React, { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { RentalApplicationFormData } from "../../types";
import { DateInput } from "@mantine/dates";
import { INPUT_ORDER } from "../../utils/constants";
import PersonInput from "../common/PersonInput";
type Props = {
  onNext?: () => void;
  onCancel?: () => void;
};

const BasicsFormStep: FC<Props> = ({ onCancel, onNext }) => {
  const form = useFormContext<RentalApplicationFormData>();
  return (
    <Stack h={"100%"} justify="space-between">
      <Stack gap={"md"}>
        <Title order={4} pt={"lg"}>
          Basic Information
        </Title>
        <PersonInput control={form.control} name="personId" label="Applicant"/>
        <Controller
          control={form.control}
          name="desiredMoveInDate"
          render={({ field, fieldState }) => (
            <DateInput
              {...field}
              label="Desired move in date"
              description="Must be a future time"
              inputWrapperOrder={INPUT_ORDER}
              error={fieldState.error?.message}
              placeholder="dd/mm/yyyy"
            />
          )}
        />
        <Controller
          control={form.control}
          name="leaseTerm"
          render={({ field, fieldState }) => (
            <NumberInput
              {...field}
              label="Lease term"
              description="In moths"
              inputWrapperOrder={INPUT_ORDER}
              error={fieldState.error?.message}
              placeholder="Enter lease term"
            />
          )}
        />
        <Controller
          control={form.control}
          name="proposedRent"
          render={({ field, fieldState }) => (
            <NumberInput
              {...field}
              label="Proposed rent"
              description={"In Ksh"}
              inputWrapperOrder={INPUT_ORDER}
              error={fieldState.error?.message}
              placeholder="Enter amount"
            />
          )}
        />
        <Controller
          control={form.control}
          name="securityDeposit"
          render={({ field, fieldState }) => (
            <NumberInput
              {...field}
              label="Security deposit"
              description={"In Ksh"}
              inputWrapperOrder={INPUT_ORDER}
              error={fieldState.error?.message}
              placeholder="Enter amount"
            />
          )}
        />
        <Controller
          control={form.control}
          name="petDetails"
          render={({ field, fieldState }) => (
            <Textarea
              {...field}
              label="Pet details"
              description={"If you have pert"}
              inputWrapperOrder={INPUT_ORDER}
              error={fieldState.error?.message}
              placeholder="Enter pet details ..."
            />
          )}
        />
        <Controller
          control={form.control}
          name="vehicleInfo"
          render={({ field, fieldState }) => (
            <Textarea
              {...field}
              label="Vehicle info"
              description={"Enter vehicle info for parking lot alocation"}
              inputWrapperOrder={INPUT_ORDER}
              error={fieldState.error?.message}
              placeholder="Enter vehicle details ..."
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
              "desiredMoveInDate",
              "leaseTerm",
              "petDetails",
              "proposedRent",
              "securityDeposit",
              "vehicleInfo",
              "personId"
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

export default BasicsFormStep;
