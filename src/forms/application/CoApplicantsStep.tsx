import { Button, Group, Stack, Title } from "@mantine/core";
import React, { FC } from "react";
import { useFormContext } from "react-hook-form";
import { RentalApplicationFormData } from "../../types";

type Props = {
  onPrev?: () => void;
};

const CoApplicantsStep: FC<Props> = ({ onPrev }) => {
  const form = useFormContext<RentalApplicationFormData>();

  return (
    <Stack h={"100%"} justify="space-between">
      <Stack gap={"md"}>
        <Title order={4} pt={"lg"}>
          Co applicants
        </Title>
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
