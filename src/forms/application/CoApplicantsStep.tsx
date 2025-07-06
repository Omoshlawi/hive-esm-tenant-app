import { TablerIcon } from "@hive/esm-core-components";
import {
  Button,
  Fieldset,
  Group,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import React, { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { RentalApplicationFormData } from "../../types";
import PersonInput from "../common/PersonInput";

type Props = {
  onPrev?: () => void;
};

const CoApplicantsStep: FC<Props> = ({ onPrev }) => {
  const form = useFormContext<RentalApplicationFormData>();
  const coApplicants = form.watch("coApplicants") ?? [];

  return (
    <Stack h={"100%"} justify="space-between">
      <Stack gap={"md"}>
        <Title order={4} pt={"lg"}>
          Co applicants
        </Title>
        {coApplicants.map((_, index) => (
          <Fieldset legend="Co applicant" py={"xs"} key={index}>
            <Stack flex={1} gap={"xs"}>
              {/* <ParticipantPersonInput index={index}/> */}
              <Controller
                control={form.control}
                name={`coApplicants.${index}.relationshipType`}
                render={({ field, fieldState: { error } }) => (
                  <TextInput
                    {...field}
                    placeholder="e.g Sibbling"
                    label="Relationship"
                    error={error?.message}
                  />
                )}
              />
              <PersonInput
                control={form.control}
                name={`coApplicants.${index}.personId`}
              />
              <Button
                color="red"
                variant="light"
                onClick={() => {
                  const fields = coApplicants.filter((_, i) => i !== index);
                  form.setValue(`coApplicants`, fields);
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
            form.setValue(`coApplicants.${coApplicants.length}`, {});
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

export default CoApplicantsStep;
