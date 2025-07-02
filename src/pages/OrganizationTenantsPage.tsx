import React from "react";
import { DashboardPageHeader } from "@hive/esm-core-components";
import { Box, Stack } from "@mantine/core";

const OrganizationTenantsPage = () => {
  return (
    <Stack>
      <Box>
        <DashboardPageHeader
          title="Tenants"
          subTitle={"Organization tenants"}
          icon={"users"}
        />
      </Box>
    </Stack>
  );
};

export default OrganizationTenantsPage;
