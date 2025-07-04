import {
  DashboardPageHeader,
  StateFullDataTable,
  TablerIcon,
} from "@hive/esm-core-components";
import { Stack, Box, ActionIcon, Group } from "@mantine/core";
import React from "react";
import { useRentalAgreements } from "../hooks";
import { ColumnDef } from "@tanstack/react-table";
import { RentalAgreement } from "../types";

const OrganizationRentalAgreementsPage = () => {
  const agreementsAsync = useRentalAgreements();

  return (
    <Stack>
      <Box>
        <DashboardPageHeader
          title="Rental Agreements"
          subTitle={"Organization rental agreements"}
          icon={"contract"}
        />
      </Box>
      <StateFullDataTable
        columns={[
          ...columns,
          {
            id: "actions",
            header: "Actions",
            cell({ row }) {
              const listing = row.original;
              return (
                <Group>
                  <Group>
                    <ActionIcon
                      variant="outline"
                      aria-label="Settings"
                      color="red"
                      // onClick={() => handleDelete(listing)}
                    >
                      <TablerIcon
                        name="trash"
                        style={{ width: "70%", height: "70%" }}
                        stroke={1.5}
                      />
                    </ActionIcon>
                  </Group>
                </Group>
              );
            },
          },
        ]}
        {...agreementsAsync}
        data={agreementsAsync.agreements}
        withColumnViewOptions
      />
    </Stack>
  );
};

export default OrganizationRentalAgreementsPage;
const columns: ColumnDef<RentalAgreement>[] = [];
