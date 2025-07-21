import { ErrorState } from "@hive/esm-core-components";
import {
  ActionIcon,
  Badge,
  Box,
  Card,
  Divider,
  Flex,
  Grid,
  Group,
  Paper,
  rem,
  SimpleGrid,
  Stack,
  Table,
  Text,
  ThemeIcon,
  Title,
  Tooltip,
} from "@mantine/core";
import {
  IconBuilding,
  IconCalendar,
  IconCheck,
  IconCurrencyDollar,
  IconDownload,
  IconEdit,
  IconHome,
  IconPaw,
  IconShare,
  IconSmokingNo,
  IconUsers,
  IconX,
} from "@tabler/icons-react";
import React, { FC, useMemo } from "react";
import { useParams } from "react-router";
import { useRentalAgreement } from "../hooks";
import { PropsWithLaunchWorkspace } from "../types";

function getStatusColor(status: string) {
  switch (status) {
    case "ACTIVE":
      return "green";
    case "PENDING":
      return "yellow";
    case "EXPIRED":
      return "red";
    case "TERMINATED":
      return "gray";
    default:
      return "blue";
  }
}

function getParticipantTypeColor(type: string) {
  switch (type) {
    case "PRIMARY_TENANT":
      return "blue";
    case "CO_TENANT":
      return "cyan";
    case "GUARANTOR":
      return "violet";
    default:
      return "gray";
  }
}

function formatCurrency(amount: string | number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "KES",
  }).format(Number(amount));
}

function formatDate(dateString: string | null) {
  if (!dateString) return "Not specified";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// TODO Clean by decomposing to components and include type details as well with actions to update/add and delete participant, retire participant and change status/e.t.c

const AgreementDetailPage: FC<PropsWithLaunchWorkspace> = ({
  launchWorkspace,
}) => {
  const { agreementId } = useParams<{ agreementId: string }>();
  const {
    agreement: agreementData,
    error,
    isLoading,
  } = useRentalAgreement(agreementId);

  const totalMonthlyCharges = useMemo(() => {
    if (!agreementData) return 0;
    return (
      Number(agreementData?.baseRentAmount) +
      agreementData.additionalCharges.reduce(
        (sum, charge) => sum + Number(charge.amount),
        0
      )
    );
  }, [agreementData]);

  if (isLoading) return null;
  if (error)
    return (
      <Paper withBorder>
        <ErrorState error={error} />
      </Paper>
    );

  return (
    <Stack>
      {/* Header Section */}
      <Flex justify="space-between" align="flex-start" wrap="wrap" gap="md">
        <Box>
          <Group align="center" mb="xs">
            <Title order={1} size="h2">
              {agreementData.agreementNumber}
            </Title>
            <Badge
              color={getStatusColor(agreementData.status)}
              variant="light"
              size="lg"
            >
              {agreementData.status}
            </Badge>
          </Group>
          <Text c="dimmed" size="sm">
            {agreementData.agreementType} Agreement • Created{" "}
            {formatDate(agreementData.createdAt)}
          </Text>
        </Box>
        <Group>
          <Tooltip label="Edit Agreement">
            <ActionIcon variant="light" size="lg">
              <IconEdit style={{ width: rem(18), height: rem(18) }} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Download PDF">
            <ActionIcon variant="light" size="lg">
              <IconDownload style={{ width: rem(18), height: rem(18) }} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Share">
            <ActionIcon variant="light" size="lg">
              <IconShare style={{ width: rem(18), height: rem(18) }} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Flex>

      <Grid mt={"lg"}>
        {/* Financial Overview */}
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card shadow="sm" padding="lg" radius="md" h="100%">
            <Group align="center" mb="md">
              <ThemeIcon size="md" variant="light" color="green">
                <IconCurrencyDollar
                  style={{ width: rem(16), height: rem(16) }}
                />
              </ThemeIcon>
              <Title order={3}>Financial Details</Title>
            </Group>

            <Stack gap="md">
              <Group justify="space-between">
                <Text fw={500}>Base Rent</Text>
                <Text size="lg" fw={700} c="green">
                  {formatCurrency(agreementData.baseRentAmount)}
                </Text>
              </Group>

              {agreementData.additionalCharges.map((charge) => (
                <Group key={charge.id} justify="space-between">
                  <Box>
                    <Text fw={500} tt="capitalize">
                      {charge.name}
                    </Text>
                    <Text size="xs" c="dimmed">
                      {charge.frequency} •{" "}
                      {charge.mandatory ? "Mandatory" : "Optional"}
                    </Text>
                  </Box>
                  <Text fw={600}>{formatCurrency(charge.amount)}</Text>
                </Group>
              ))}

              <Divider />
              <Group justify="space-between">
                <Text fw={700} size="lg">
                  Total Monthly
                </Text>
                <Text size="xl" fw={700} c="green">
                  {formatCurrency(totalMonthlyCharges)}
                </Text>
              </Group>
            </Stack>
          </Card>
        </Grid.Col>

        {/* Agreement Timeline */}
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card shadow="sm" padding="lg" radius="md" h="100%">
            <Group align="center" mb="md">
              <ThemeIcon size="md" variant="light" color="blue">
                <IconCalendar style={{ width: rem(16), height: rem(16) }} />
              </ThemeIcon>
              <Title order={3}>Timeline & Terms</Title>
            </Group>

            <Stack gap="md">
              <Group justify="space-between">
                <Text fw={500}>Start Date</Text>
                <Text>{formatDate(agreementData.startDate)}</Text>
              </Group>

              <Group justify="space-between">
                <Text fw={500}>End Date</Text>
                <Text>
                  {agreementData.endDate
                    ? formatDate(agreementData.endDate)
                    : "Open-ended"}
                </Text>
              </Group>

              <Group justify="space-between">
                <Text fw={500}>Lease Term</Text>
                <Text>{agreementData.leaseDetails.leaseTerm} year(s)</Text>
              </Group>

              <Group justify="space-between">
                <Text fw={500}>Notice Period</Text>
                <Text>{agreementData.noticePeriodDays} days</Text>
              </Group>

              <Group justify="space-between">
                <Text fw={500}>Auto Renewal</Text>
                <Badge
                  color={agreementData.autoRenewal ? "green" : "red"}
                  variant="light"
                >
                  {agreementData.autoRenewal ? "Enabled" : "Disabled"}
                </Badge>
              </Group>
            </Stack>
          </Card>
        </Grid.Col>

        {/* Participants */}
        <Grid.Col span={12}>
          <Card shadow="sm" padding="lg" radius="md">
            <Group align="center" mb="md">
              <ThemeIcon size="md" variant="light" color="violet">
                <IconUsers style={{ width: rem(16), height: rem(16) }} />
              </ThemeIcon>
              <Title order={3}>Participants</Title>
            </Group>

            <Table striped highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Tenant ID</Table.Th>
                  <Table.Th>Tenant Name</Table.Th>
                  <Table.Th>Type</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th>Move In</Table.Th>
                  <Table.Th>Move Out</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {agreementData.participants.map((participant) => (
                  <Table.Tr key={participant.id}>
                    <Table.Td>
                      <Text size="sm" ff="monospace">
                        {participant?.tenant?.tenantNumber ?? "--"}
                      </Text>
                    </Table.Td>
                    <Table.Td>{participant?.tenant?.person?.name}</Table.Td>
                    <Table.Td>
                      <Badge
                        color={getParticipantTypeColor(
                          participant.participantType
                        )}
                        variant="light"
                        size="sm"
                      >
                        {participant.participantType.replace("_", " ")}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Badge
                        color={getStatusColor(participant.status)}
                        variant="light"
                        size="sm"
                      >
                        {participant.status}
                      </Badge>
                    </Table.Td>
                    <Table.Td>{formatDate(participant.moveInDate)}</Table.Td>
                    <Table.Td>{formatDate(participant.moveOutDate)}</Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Card>
        </Grid.Col>

        {/* Policies & Rules */}
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card shadow="sm" padding="lg" radius="md" h="100%">
            <Group align="center" mb="md">
              <ThemeIcon size="md" variant="light" color="orange">
                <IconHome style={{ width: rem(16), height: rem(16) }} />
              </ThemeIcon>
              <Title order={3}>Property Policies</Title>
            </Group>

            <SimpleGrid cols={1} spacing="md">
              <Group justify="space-between">
                <Group gap="xs">
                  <IconPaw size={16} />
                  <Text fw={500}>Pets Allowed</Text>
                </Group>
                <ThemeIcon
                  size="sm"
                  color={agreementData.petsAllowed ? "green" : "red"}
                  variant="light"
                >
                  {agreementData.petsAllowed ? (
                    <IconCheck size={12} />
                  ) : (
                    <IconX size={12} />
                  )}
                </ThemeIcon>
              </Group>

              <Group justify="space-between">
                <Group gap="xs">
                  <IconSmokingNo size={16} />
                  <Text fw={500}>Smoking Allowed</Text>
                </Group>
                <ThemeIcon
                  size="sm"
                  color={agreementData.smokingAllowed ? "green" : "red"}
                  variant="light"
                >
                  {agreementData.smokingAllowed ? (
                    <IconCheck size={12} />
                  ) : (
                    <IconX size={12} />
                  )}
                </ThemeIcon>
              </Group>

              <Group justify="space-between">
                <Group gap="xs">
                  <IconBuilding size={16} />
                  <Text fw={500}>Subletting Allowed</Text>
                </Group>
                <ThemeIcon
                  size="sm"
                  color={agreementData.sublettingAllowed ? "green" : "red"}
                  variant="light"
                >
                  {agreementData.sublettingAllowed ? (
                    <IconCheck size={12} />
                  ) : (
                    <IconX size={12} />
                  )}
                </ThemeIcon>
              </Group>
            </SimpleGrid>
          </Card>
        </Grid.Col>

        {/* System Information */}
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card shadow="sm" padding="lg" radius="md" h="100%">
            <Title order={3} mb="md">
              System Information
            </Title>

            <Stack gap="sm">
              <Group justify="space-between">
                <Text size="sm" c="dimmed">
                  Agreement ID
                </Text>
                <Text size="sm" ff="monospace">
                  {agreementData.id.slice(0, 8)}...
                </Text>
              </Group>

              <Group justify="space-between">
                <Text size="sm" c="dimmed">
                  Property ID
                </Text>
                <Text size="sm" ff="monospace">
                  {agreementData.propertyId.slice(0, 8)}...
                </Text>
              </Group>

              <Group justify="space-between">
                <Text size="sm" c="dimmed">
                  Created
                </Text>
                <Text size="sm">{formatDate(agreementData.createdAt)}</Text>
              </Group>

              <Group justify="space-between">
                <Text size="sm" c="dimmed">
                  Last Updated
                </Text>
                <Text size="sm">{formatDate(agreementData.updatedAt)}</Text>
              </Group>

              <Group justify="space-between">
                <Text size="sm" c="dimmed">
                  Voided
                </Text>
                <Badge
                  color={agreementData.voided ? "red" : "green"}
                  variant="light"
                  size="sm"
                >
                  {agreementData.voided ? "Yes" : "No"}
                </Badge>
              </Group>
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
    </Stack>
  );
};

export default AgreementDetailPage;
