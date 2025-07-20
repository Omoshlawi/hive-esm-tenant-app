import React, { FC } from "react";
import { RentalAgreementFormdata } from "../../types";
import { Controller, useFormContext } from "react-hook-form";
import { TablerIcon } from "@hive/esm-core-components";
import {
  Stack,
  Title,
  Fieldset,
  TextInput,
  Button,
  Group,
  Select,
} from "@mantine/core";
import PersonInput from "../common/PersonInput";
import { DateInput } from "@mantine/dates";
import { INPUT_ORDER } from "../../utils/constants";
type Props = {
  onNext?: () => void;
  onPrev?: () => void;
};
const ParticipantsStep: FC<Props> = ({ onNext, onPrev }) => {
  const form = useFormContext<RentalAgreementFormdata>();
  const participants = form.watch("participants") ?? [];

  return (
    <Stack h={"100%"} justify="space-between">
      <Stack gap={"md"}>
        <Title order={4} pt={"lg"}>
          Particpants
        </Title>
        {participants.map((_, index) => (
          <Fieldset legend="Co applicant" py={"xs"} key={index}>
            <Stack flex={1} gap={"xs"}>
              {/* <ParticipantPersonInput index={index}/> */}
              <Controller
                control={form.control}
                name={`participants.${index}.moveInDate`}
                render={({ field, fieldState: { error } }) => (
                  <DateInput
                    {...field}
                    placeholder="dd/mm/yyyy"
                    label="Move In Date"
                    error={error?.message}
                    inputWrapperOrder={INPUT_ORDER}
                    description="The date when the participant will move in"
                  />
                )}
              />
              <Controller
                control={form.control}
                name={`participants.${index}.moveOutDate`}
                render={({ field, fieldState: { error } }) => (
                  <DateInput
                    {...field}
                    placeholder="dd/mm/yyyy"
                    label="Move Out Date"
                    error={error?.message}
                    inputWrapperOrder={INPUT_ORDER}
                    description="The date when the participant will move out"
                  />
                )}
              />
              <Controller
                control={form.control}
                name={`participants.${index}.participantType`}
                render={({ field, fieldState: { error } }) => (
                  <Select
                    {...field}
                    label="Participant type"
                    data={[
                      { label: "Primary Tenant", value: "PRIMARY_TENANT" },
                      { label: "Co-Tenant", value: "CO_TENANT" },
                      { label: "Guarantor", value: "GUARANTOR" },
                      { label: "Occupant", value: "OCCUPANT" },
                      { label: "Sublessee", value: "SUBLESSEE" },
                      {
                        label: "Authorized Occupant",
                        value: "AUTHORIZED_OCCUPANT",
                      },
                    ]}
                    // description="Must be a future time"
                    inputWrapperOrder={INPUT_ORDER}
                    error={error?.message}
                    placeholder="Select tenant type"
                  />
                )}
              />
              <PersonInput
                control={form.control}
                name={`participants.${index}.tenantId`}
              />
              <Button
                color="red"
                variant="light"
                onClick={() => {
                  const fields = participants.filter((_, i) => i !== index);
                  form.setValue(`participants`, fields as any);
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
            form.setValue(`participants.${participants.length}`, {});
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
            const valid = await form.trigger(["participants"]);
            if (valid) onNext?.();
          }}
        >
          Next
        </Button>
      </Group>
    </Stack>
  );
};

export default ParticipantsStep;
