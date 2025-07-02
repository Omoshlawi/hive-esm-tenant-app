import { Button, Group, Stack, Title } from "@mantine/core";
import React, { FC } from "react";
import { useFormContext } from "react-hook-form";
import { RentalApplicationFormData } from "../../types";
type Props = {
  onNext?: () => void;
  onPrev?: () => void;
};
const TenantStep: FC<Props> = ({ onNext, onPrev }) => {
  const form = useFormContext<RentalApplicationFormData>();

  return (
    <Stack h={"100%"} justify="space-between">
      <Stack gap={"md"}>
        <Title order={4} pt={"lg"}>
          Tenant
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
          type={"button"}
          variant="filled"
          loading={form.formState.isSubmitting}
          disabled={form.formState.isSubmitting}
          onClick={async () => {
            const valid = await form.trigger("tenantId");
            if (valid) onNext?.();
          }}
        >
          Next
        </Button>
      </Group>
    </Stack>
  );
};

export default TenantStep;
