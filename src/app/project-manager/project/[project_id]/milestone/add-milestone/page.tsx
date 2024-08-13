'use client';

import { ActionIcon, Avatar, Divider, Group, Stack, Text } from '@mantine/core';
import useCreateMilestone from '../../../../../../services/milestone/hooks/useCreateMilestone';
import FormMilestoneContainer from '../../../../../../features/projects/project_detail/Tab/Milestone/components/FormMilestoneContainer';
import { ICMilestone } from '../../../../../../assets/icons/nav-icon/milestone.icon';
import MilestoneForm from '../../../../../../features/projects/project_detail/Tab/Milestone/components/MilestoneForm';
import { useParams, useRouter } from 'next/navigation';
import useQueryDetailProject from '../../../../../../services/project/hooks/useQueryDetailProject';
import { useState } from 'react';
import { BsBack } from 'react-icons/bs';
import { BiArrowBack } from 'react-icons/bi';

export interface IMilestoneParamsData {
  milestoneName: string;
  projectId: string;
  startedDate: string;
  endDate: string;
  member: any;
}

const AddMilestone = () => {
  const milestone = useCreateMilestone();
  const [projectDetailData, setProjectDetailData] = useState<any>(null);
  const params = useParams<{ project_id: string }>();
  const router = useRouter();

  const projectDetail = useQueryDetailProject({
    projectId: params.project_id,
    onSuccesCb(data) {},
    onErrorCb(error) {},
  });

  const handleSubmitMilestone = (values: IMilestoneParamsData) => {
    const payload = {
      milestoneName: values.milestoneName,
      projectId: params.project_id,
      startedDate: values.startedDate as string,
      endDate: values.endDate as string,
      member: values.member,
    };

    milestone.mutate(payload);
  };

  return (
    <Stack className="container mx-auto">
      {/* <Text className="text-base font-semibold text-custom_black md:text-xl">
        Milestone Form
      </Text> */}

      <Group>
        <ActionIcon
          variant="outline"
          color="indigo"
          onClick={() => router.back()}
        >
          <BiArrowBack className="text-xl" />
        </ActionIcon>
        <Text className="text-base md:text-lg font-medium">Kembali</Text>
      </Group>

      <Divider className="bg-neutral-200 rounded-lg h-0.5 border-0" />

      <Group className="w-full" justify="center">
        <Group>
          <Avatar
            size={30}
            className="h-fit"
            src={
              !projectDetail.data?.project.projectIcon
                ? ''
                : `${process.env.NEXT_PUBLIC_API_DOWNLOAD_FILES_URL}/projects/${projectDetail.data.project.projectIcon}`
            }
          />
          <Text className="text-2xl font-medium">
            {projectDetail.data?.project.projectName}
          </Text>
        </Group>
      </Group>

      <FormMilestoneContainer
        title="Tambah Milestone"
        icon={<ICMilestone width={36} height={36} />}
      >
        <MilestoneForm
          isLoading={milestone.isSuccess}
          onSubmit={handleSubmitMilestone}
        />
      </FormMilestoneContainer>
    </Stack>
  );
};

export default AddMilestone;
