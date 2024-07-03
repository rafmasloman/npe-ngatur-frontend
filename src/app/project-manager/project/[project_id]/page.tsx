'use client';

import {
  Avatar,
  Group,
  Progress,
  Stack,
  Tabs,
  Text,
  Tooltip,
  rem,
} from '@mantine/core';
import { useParams } from 'next/navigation';
import useQueryDetailProject from '../../../../services/project/hooks/useQueryDetailProject';
import { COLORS } from '../../../../constant/colors';
import { useState } from 'react';
import BaseTab from '../../../../features/projects/project_detail/Tab/BaseTab';
import OverviewPanel from '../../../../features/projects/project_detail/Tab/Overview/components/OverviewPanel';
import { useGetMilestonesByProject } from '../../../../services/milestone/hooks/useQueryMilestoneProject';
import ModalForm from '../../../../features/projects/project_detail/components/ModalForm';

const ProjectDetail = () => {
  const params = useParams<{ project_id: string }>();

  const [activeTab, setActiveTab] = useState<string | null>('overview');

  const projectDetail = useQueryDetailProject({
    projectId: params.project_id,
    onSuccesCb(data) {
      return data;
    },
    onErrorCb(error) {
      return error;
    },
  });

  const milestonesProject = useGetMilestonesByProject(params.project_id);

  console.log('milestones : ', milestonesProject.data);

  if (projectDetail.isLoading) {
    return (
      <Text className="text-center h-screen">Loading Detail Project .... </Text>
    );
  }

  return (
    <Stack className="container mx-auto" gap={0}>
      {/* <Text>Project Detail Page</Text> */}

      <Group
        justify="space-between"
        align="center"
        className="p-5 rounded-3xl rounded-bl-none border-b-0 rounded-br-none border border-neutral-200 "
      >
        <Stack gap={20}>
          <Group>
            <Avatar
              src={`${process.env.NEXT_PUBLIC_API_DOWNLOAD_FILES_URL}/projects/${projectDetail?.data?.data.project.projectIcon}`}
              alt={'Project Showcase'}
              className="w-1.5 h-fit md:w-12 md:h-fit"
            />

            <Text className="text-base md:text-base lg:text-4xl" fw={600}>
              {projectDetail?.data?.data.project.projectName}
            </Text>
          </Group>

          <Text
            className="text-xs md:text-sm lg:text-base w-full md:w-2/3"
            ta="justify"
          >
            {projectDetail?.data?.data.project.description}
          </Text>

          <Group>
            <Text className="text-gray-400 text-xs md:text-sm lg:text-base ">
              Avaiable on :{' '}
            </Text>
            {projectDetail?.data?.data.project.platform
              ?.split(',')
              .map((platform: any, index: number) => {
                return (
                  <Text
                    key={platform}
                    fz={'0.75rem'}
                    bg={index % 2 === 0 ? COLORS.secondary : COLORS.third}
                    px={10}
                    py={4}
                    color="white"
                    style={{
                      borderRadius: '7px',
                    }}
                  >
                    {platform}
                  </Text>
                );
              })}
          </Group>

          <Group>
            <Text className="text-gray-400">Project Progress : </Text>
            <Progress
              value={
                !projectDetail?.data?.data.project.progress
                  ? 0
                  : projectDetail?.data?.data.project.progress
              }
              radius={'lg'}
              size={'lg'}
              className="w-[300px] h-[18px]"
              color={
                projectDetail?.data?.data.project.progress > 0 &&
                projectDetail?.data?.data.project.progress < 100
                  ? COLORS.primary
                  : projectDetail?.data?.data.project.progress === 100
                  ? 'green'
                  : 'gray'
              }
              styles={{
                label: {
                  fontSize: rem(12),
                  fontWeight: 500,
                },
              }}
            />
          </Group>
        </Stack>

        <Stack gap={30} align="start">
          <ModalForm btnText="Invite Member" title="Invite Member to Project">
            {/* <InviteMemberForm project={project} /> */}
            <Text>Tess</Text>
          </ModalForm>

          <Group align="end" justify="right">
            <Stack gap={10}>
              <Text className="text-sm text-gray-400 font-medium">
                Teams Project
              </Text>
              <Avatar.Group spacing={'md'}>
                {projectDetail?.data?.data.project.member?.map(
                  (member: any, index: number) => {
                    return (
                      <Tooltip key={index} label={`${member.user?.firstname}`}>
                        <Avatar
                          radius={'xl'}
                          size={45}
                          src={`${process.env.NEXT_PUBLIC_API_DOWNLOAD_FILES_URL}/members/${member.profilePicture}`}
                          className="border border-solid border-gray-300"
                        />
                      </Tooltip>
                    );
                  },
                )}
              </Avatar.Group>
            </Stack>
          </Group>
        </Stack>
      </Group>

      <BaseTab>
        <Tabs.Panel className="" value="overview" pt={rem(50)}>
          <OverviewPanel
            projectName={projectDetail.data?.data.project.projectName}
            projectPrice={projectDetail.data?.data.project.price}
            deadline={projectDetail.data?.data.project.endDate}
            task={projectDetail.data?.data.todos}
            totalTask={projectDetail.data?.data.project.task.length}
            assignMember={projectDetail.data?.data.project.member.map((m) => {
              return {
                id: m.id,
                fullname: `${m.user.firstname} ${m.user.lastname}`,
                position: m.position,
                profilePicture: m.profilePicture,
              };
            })}
          />
        </Tabs.Panel>

        <Tabs.Panel value="tasks" pt={rem(50)}>
          <Text>Task Workspace</Text>
        </Tabs.Panel>

        <Tabs.Panel value="milestone" pt={rem(50)}>
          <Text>Task Workspace</Text>
        </Tabs.Panel>
      </BaseTab>
    </Stack>
  );
};

export default ProjectDetail;
