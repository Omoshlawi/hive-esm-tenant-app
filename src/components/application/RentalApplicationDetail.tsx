import { Paper, Tabs } from "@mantine/core";
import {
  IconPhoto,
  IconMessageCircle,
  IconSettings,
} from "@tabler/icons-react";
import React, { FC } from "react";
import DetailsTab from "./DetailsTab";
import ReferenceTab from "./ReferenceTab";
import CoApplicantsTab from "./CoApplicantsTab";

type Props = {
  applicationId: string;
};

const RentalApplicationDetail: FC<Props> = ({ applicationId }) => {
  return (
    <Paper p={"sm"}>
      <Tabs defaultValue="details" orientation="vertical">
        <Tabs.List>
          <Tabs.Tab value="details" leftSection={<IconPhoto size={12} />}>
            Details
          </Tabs.Tab>
          <Tabs.Tab
            value="references"
            leftSection={<IconMessageCircle size={12} />}
          >
            Reference
          </Tabs.Tab>
          <Tabs.Tab
            value="co-applicants"
            leftSection={<IconSettings size={12} />}
          >
            Co applicants
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="details">
          <DetailsTab />
        </Tabs.Panel>

        <Tabs.Panel value="references">
          <ReferenceTab />
        </Tabs.Panel>

        <Tabs.Panel value="co-applicants">
          <CoApplicantsTab />
        </Tabs.Panel>
      </Tabs>
    </Paper>
  );
};

export default RentalApplicationDetail;
