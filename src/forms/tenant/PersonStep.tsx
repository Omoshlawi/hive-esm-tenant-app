import {
  Stack,
  Title,
  SegmentedControl,
  Group,
  Button,
  Select,
  TextInput,
} from "@mantine/core";
import React, { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TenantFormData } from "../../types";
import { useSearchPeople } from "../../hooks/useUsers";
import { IconSearch } from "@tabler/icons-react";
type Props = {
  onNext?: () => void;
  onPrev?: () => void;
};
const PersonStep: FC<Props> = ({ onNext, onPrev }) => {
  const form = useFormContext<TenantFormData>();
  const mode = form.watch("mode");
  const personsearchAsync = useSearchPeople();
  return (
    <Stack h={"100%"} justify="space-between">
      <Stack gap={"md"}>
        <Title order={4} pt={"lg"}>
          Person info
        </Title>
        <Controller
          control={form.control}
          name="mode"
          render={({ field, fieldState: { error } }) => (
            <SegmentedControl
              value={field.value}
              onChange={field.onChange}
              data={[
                { label: "Search", value: "search" },
                { label: "Create", value: "create" },
              ]}
            />
          )}
        />
        {mode === "search" && (
          <Controller
            control={form.control}
            name="personId"
            render={({ field, fieldState: { error } }) => (
              <Select
                {...field}
                label="Person"
                placeholder="Search ..."
                leftSection={<IconSearch size={16} />}
                nothingFoundMessage="Nothing found ..."
                searchable
                searchValue={personsearchAsync.peopleSearchValue}
                onSearchChange={personsearchAsync.searchPeople}
                data={personsearchAsync.people.map((person) => ({
                  label: person.email,
                  value: person.id,
                }))}
                error={error?.message}
              />
            )}
          />
        )}
        {mode === "create" && (
          <>
            <Controller
              control={form.control}
              name="personInfo.firstName"
              render={({ field, fieldState: { error } }) => (
                <TextInput
                  {...field}
                  withAsterisk
                  label="First name"
                  placeholder="e.g Hohn"
                  error={error?.message}
                />
              )}
            />
            <Controller
              control={form.control}
              name="personInfo.lastName"
              render={({ field, fieldState: { error } }) => (
                <TextInput
                  {...field}
                  withAsterisk
                  label="Last name"
                  placeholder="e.g Doe"
                  error={error?.message}
                />
              )}
            />
            <Controller
              control={form.control}
              name="personInfo.surname"
              render={({ field, fieldState: { error } }) => (
                <TextInput
                  {...field}
                  label="Surname"
                  placeholder="Enter surname"
                  error={error?.message}
                />
              )}
            />
            <Controller
              control={form.control}
              name="personInfo.email"
              render={({ field, fieldState: { error } }) => (
                <TextInput
                  {...field}
                  label="Email"
                  type="email"
                  withAsterisk
                  placeholder="e.g johndoe@hive.co.ke"
                  error={error?.message}
                />
              )}
            />
            <Controller
              control={form.control}
              name="personInfo.phoneNumber"
              render={({ field, fieldState: { error } }) => (
                <TextInput
                  {...field}
                  label="Phone number"
                  withAsterisk
                  placeholder="e.g 25412345678"
                  error={error?.message}
                />
              )}
            />
            <Controller
              control={form.control}
              name="personInfo.gender"
              render={({ field, fieldState: { error } }) => (
                <Select
                  {...field}
                  label="Gender"
                  placeholder="Select gender"
                  data={["Male", "Female"]}
                  error={error?.message}
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
              "personId",
              "mode",
              "personInfo",
              "personInfo.email",
              "personInfo.firstName",
              "personInfo.lastName",
              "personInfo.gender",
              "personInfo.phoneNumber",
              "personInfo.surname",
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

export default PersonStep;
