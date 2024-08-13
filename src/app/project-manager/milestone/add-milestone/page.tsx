'use client';

import { Stack, Text } from '@mantine/core';
import FormMilestoneContainer from '../../../../features/projects/project_detail/Tab/Milestone/components/FormMilestoneContainer';
import { ICMilestone } from '../../../../assets/icons/nav-icon/milestone.icon';
import MilestoneForm from '../../../../features/projects/project_detail/Tab/Milestone/components/MilestoneForm';
import useCreateMilestone from '../../../../services/milestone/hooks/useCreateMilestone';

export interface IMilestoneParamsData {
  milestoneName: string;
  projectId: string;
  startedDate: string;
  endDate: string;
  member: any;
}

const AddMilestone = () => {
  const milestone = useCreateMilestone();

  const handleSubmitMilestone = (values: IMilestoneParamsData) => {
    const params = {
      milestoneName: values.milestoneName,
      projectId: values.projectId,
      startedDate: values.startedDate as string,
      endDate: values.endDate as string,
      member: values.member,
    };

    milestone.mutate(params);
  };

  
  return (
    <Stack className="container mx-auto">
      {/* <Text className="text-base font-semibold text-custom_black md:text-xl">
        Milestone Form
      </Text> */}

      <FormMilestoneContainer
        title="Tambah Milestone"
        icon={<ICMilestone width={36} height={36} />}
      >
        <MilestoneForm onSubmit={handleSubmitMilestone} />
      </FormMilestoneContainer>
    </Stack>
  );
};

export default AddMilestone;
