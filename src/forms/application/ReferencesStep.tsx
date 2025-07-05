import { TablerIcon } from "@hive/esm-core-components";
import {
  Button,
  Fieldset,
  Group,
  Select,
  Stack,
  TextInput,
  Title
} from "@mantine/core";
import React, { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { RentalApplicationFormData } from "../../types";
type Props = {
  onNext?: () => void;
  onPrev?: () => void;
};
const ReferencesStep: FC<Props> = ({ onNext, onPrev }) => {
  const form = useFormContext<RentalApplicationFormData>();
  const references = form.watch("references") ?? [];

  return (
    <Stack h={"100%"} justify="space-between">
      <Stack gap={"md"}>
        <Title order={4} pt={"lg"}>
          References
        </Title>
        {references.map((_, index) => (
          <Fieldset legend="Application reference" py={"xs"} key={index}>
            <Stack flex={1} gap={"xs"}>
              <Controller
                control={form.control}
                name={`references.${index}.referenceType`}
                render={({ field, fieldState: { error } }) => (
                  <Select
                    {...field}
                    data={[
                      { label: "Personal", value: "PERSONAL" },
                      { label: "Professional", value: "PROFESSIONAL" },
                      {
                        label: "Previous landlord",
                        value: "PREVIOUS_LANDLORD",
                      },
                      { label: "Employer", value: "EMPLOYER" },
                      { label: "Character", value: "CHARACTER" },
                      {
                        label: "Emmergency contact",
                        value: "EMERGENCY_CONTACT",
                      },
                    ]}
                    placeholder="Select one"
                    label="Type"
                    error={error?.message}
                  />
                )}
              />

              <Controller
                control={form.control}
                name={`references.${index}.name`}
                render={({ field, fieldState: { error } }) => (
                  <TextInput
                    {...field}
                    placeholder="e.g John Doe"
                    label="Name"
                    error={error?.message}
                  />
                )}
              />
              <Controller
                control={form.control}
                name={`references.${index}.relationship`}
                render={({ field, fieldState: { error } }) => (
                  <TextInput
                    {...field}
                    placeholder="e.g Mother"
                    label="Relationship"
                    error={error?.message}
                  />
                )}
              />
              <Controller
                control={form.control}
                name={`references.${index}.phoneNumber`}
                render={({ field, fieldState: { error } }) => (
                  <TextInput
                    {...field}
                    placeholder="e.g 254712345678"
                    label="Phone number"
                    error={error?.message}
                  />
                )}
              />
              <Controller
                control={form.control}
                name={`references.${index}.email`}
                render={({ field, fieldState: { error } }) => (
                  <TextInput
                    {...field}
                    placeholder="e.g johndoe@hive.co.ke"
                    label="Email"
                    type="email"
                    error={error?.message}
                  />
                )}
              />
              <Controller
                control={form.control}
                name={`references.${index}.company`}
                render={({ field, fieldState: { error } }) => (
                  <TextInput
                    {...field}
                    placeholder="e.g vstech limited"
                    label="Company"
                    error={error?.message}
                  />
                )}
              />
              <Controller
                control={form.control}
                name={`references.${index}.position`}
                render={({ field, fieldState: { error } }) => (
                  <TextInput
                    {...field}
                    placeholder="e.g Technical lead"
                    label="Position"
                    error={error?.message}
                  />
                )}
              />
              <Button
                color="red"
                variant="light"
                onClick={() => {
                  const fields = references.filter((_, i) => i !== index);
                  form.setValue(`references`, fields);
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
            form.setValue(`references.${references.length}`, {});
          }}
        >
          Add Participant
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
          type={"button"}
          variant="filled"
          loading={form.formState.isSubmitting}
          disabled={form.formState.isSubmitting}
          onClick={async () => {
            const valid = await form.trigger("references");
            if (valid) onNext?.();
          }}
        >
          Next
        </Button>
      </Group>
    </Stack>
  );
};

export default ReferencesStep;
