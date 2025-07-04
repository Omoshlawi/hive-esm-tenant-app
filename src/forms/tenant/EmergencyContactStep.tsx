import React, { FC } from "react";
import { TenantFormData } from "../../types";
import { Stack, Title, Group, Button, TextInput } from "@mantine/core";
import { Controller, useFormContext } from "react-hook-form";
type Props = {
  onPrev?: () => void;
};
const EmergencyContactStep: FC<Props> = ({ onPrev }) => {
  const form = useFormContext<TenantFormData>();

  return (
    <Stack h={"100%"} justify="space-between">
      <Stack gap={"md"}>
        <Title order={4} pt={"lg"}>
          Emmergency contact
        </Title>
        <Controller
          control={form.control}
          name="emergencyContactName"
          render={({ field, fieldState: { error } }) => (
            <TextInput
              {...field}
              label="Contact name"
              placeholder="e.g John Doe"
              error={error?.message}
            />
          )}
        />
        <Controller
          control={form.control}
          name="emergencyContactEmail"
          render={({ field, fieldState: { error } }) => (
            <TextInput
              {...field}
              label="Contact Email"
              type="email"
              placeholder="e.g johndoe@hive.co.ke"
              error={error?.message}
            />
          )}
        />
        <Controller
          control={form.control}
          name="emergencyContactPhone"
          render={({ field, fieldState: { error } }) => (
            <TextInput
              {...field}
              label="Contact Phone number"
              placeholder="e.g 25412345678"
              error={error?.message}
            />
          )}
        />
        <Controller
          control={form.control}
          name="emergencyContactRelation"
          render={({ field, fieldState: { error } }) => (
            <TextInput
              {...field}
              label="Contact Relationship"
              placeholder="e.g 25412345678"
              error={error?.message}
            />
          )}
        />
      </Stack>
      <Group gap={1}>
        <Button flex={1} variant="default" radius={0} onClick={onPrev}>
          Previous
        </Button>
        <Button
          radius={0}
          flex={1}
          fullWidth
          type={"submit"}
          variant="filled"
          loading={form.formState.isSubmitting}
          disabled={form.formState.isSubmitting}
        >
          Submit
        </Button>
      </Group>
    </Stack>
  );
};

export default EmergencyContactStep;
