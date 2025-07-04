import { Stack, Title, Group, Button } from "@mantine/core";
import React, { FC } from "react";
import { TenantFormData } from "../../types";
import { useFormContext } from "react-hook-form";
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
            const valid = await form.trigger([]);
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
