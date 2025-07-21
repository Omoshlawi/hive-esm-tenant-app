import { TablerIcon } from "@hive/esm-core-components";
import {
  Stack,
  Title,
  Fieldset,
  TextInput,
  Button,
  Group,
  Card,
  Select,
  NumberInput,
  Textarea,
  Checkbox,
} from "@mantine/core";
import React, { FC } from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
  TenancyAgreement,
  TenancyAgreementFormData,
  TenancyApplicationFormData,
} from "../../types";
import PersonInput from "../common/PersonInput";

type Props = {
  onPrev?: () => void;
};
const AdditionalChargesStep: FC<Props> = ({ onPrev }) => {
  const form = useFormContext<TenancyAgreementFormData>();
  const additionalCharges = form.watch("additionalCharges") ?? [];

  return (
    <Stack h={"100%"} justify="space-between">
      <Stack gap={"md"}>
        <Title order={4} pt={"lg"}>
          Additional Charges
        </Title>
        {additionalCharges.map((_, index) => (
          <Fieldset legend="Additional Charge" py={"xs"}>
            <Stack flex={1} gap={"xs"}>
              <Controller
                control={form.control}
                name={`additionalCharges.${index}.name`}
                render={({ field, fieldState: { error } }) => (
                  <TextInput
                    {...field}
                    placeholder="Charge name"
                    label="Charge"
                    error={error?.message}
                  />
                )}
              />
              <Controller
                control={form.control}
                name={`additionalCharges.${index}.frequency`}
                render={({ field, fieldState: { error } }) => (
                  <Select
                    {...field}
                    data={[
                      { label: "One Time", value: "ONE_TIME" },
                      { label: "Monthly", value: "MONTHLY" },
                      { label: "Weekly", value: "WEEKLY" },
                      { label: "Per Night", value: "PER_NIGHT" },
                      { label: "Annually", value: "ANNUALLY" },
                    ]}
                    placeholder="Select frequency"
                    label="Frequency"
                    error={error?.message}
                  />
                )}
              />
              <Controller
                control={form.control}
                name={`additionalCharges.${index}.amount`}
                render={({ field, fieldState: { error } }) => (
                  <NumberInput
                    {...field}
                    placeholder="Charge amount"
                    label="Amount"
                    error={error?.message}
                  />
                )}
              />
              <Controller
                control={form.control}
                name={`additionalCharges.${index}.description`}
                render={({ field, fieldState: { error } }) => (
                  <Textarea
                    {...field}
                    placeholder="Description"
                    label="Description"
                    error={error?.message}
                  />
                )}
              />
              <Controller
                control={form.control}
                name={`additionalCharges.${index}.mandatory`}
                render={({ field, fieldState: { error } }) => (
                  <Checkbox
                    label="Mandatory?"
                    checked={field.value}
                    onChange={(event) =>
                      field.onChange(event.currentTarget.checked)
                    }
                    error={error?.message}
                    ref={field.ref}
                    disabled={field.disabled}
                    name={field.name}
                    onBlur={field.onBlur}
                  />
                )}
              />
              <Button
                color="red"
                variant="light"
                onClick={() => {
                  const fields = additionalCharges.filter(
                    (_, i) => i !== index
                  );
                  form.setValue(`additionalCharges`, fields);
                }}
                leftSection={<TablerIcon name="trash" size={16} />}
              >
                Delete
              </Button>
            </Stack>
          </Fieldset>
        ))}
        <Button
          variant="outline"
          leftSection={<TablerIcon name="plus" />}
          onClick={() => {
            form.setValue(`additionalCharges.${additionalCharges.length}`, {
              amount: 0,
              name: "",
              description: "",
              frequency: "ONE_TIME",
              mandatory: false,
            });
          }}
        >
          Add Additional charges
        </Button>
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

export default AdditionalChargesStep;
