import { Button, Group, Paper, Stack, Tabs } from "@mantine/core";
import {
  IconPhoto,
  IconMessageCircle,
  IconSettings,
} from "@tabler/icons-react";
import React, { FC } from "react";
import DetailsTab from "./DetailsTab";
import ReferenceTab from "./ReferenceTab";
import CoApplicantsTab from "./CoApplicantsTab";
import ApplicationActions from "./ApplicationActions";
import { PropsWithLaunchWorkspace } from "../../types";

type Props = PropsWithLaunchWorkspace & {
  applicationId: string;
};

const RentalApplicationDetail: FC<Props> = ({
  applicationId,
  launchWorkspace,
}) => {
  return (
    <Paper p={"sm"} component={Stack}>
      <ApplicationActions
        applicationId={applicationId}
        launchWorkspace={launchWorkspace}
      />
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
          <DetailsTab applicationId={applicationId} />
        </Tabs.Panel>

        <Tabs.Panel value="references">
          <ReferenceTab applicationId={applicationId} />
        </Tabs.Panel>

        <Tabs.Panel value="co-applicants">
          <CoApplicantsTab applicationId={applicationId} />
        </Tabs.Panel>
      </Tabs>
    </Paper>
  );
};

export default RentalApplicationDetail;
