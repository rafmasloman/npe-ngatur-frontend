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
import { useParams, usePathname, useRouter } from 'next/navigation';
import useQueryDetailProject from '../../../../services/project/hooks/useQueryDetailProject';
import { COLORS } from '../../../../constant/colors';
import { useState } from 'react';
import BaseTab from '../../../../features/projects/project_detail/Tab/BaseTab';
import OverviewPanel from '../../../../features/projects/project_detail/Tab/Overview/components/OverviewPanel';
import { useGetMilestonesByProject } from '../../../../services/milestone/hooks/useQueryMilestoneProject';
import ModalForm from '../../../../features/projects/project_detail/components/ModalForm';
import MilestonePanel from '../../../../features/projects/project_detail/Tab/Milestone/components/MilestonePanel';
import TaskPanel from '../../../../features/projects/project_detail/Tab/Task/components/TaskPanel';
import InviteMemberForm from '../../../../features/projects/project_detail/components/InviteMemberForm';

const ProjectDetail = () => {
  const params = useParams<{ project_id: string }>();
  const url = usePathname();

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

  if (projectDetail.isLoading) {
    return (
      <Text className="text-center h-screen">Loading Detail Project .... </Text>
    );
  }

  return (
    <Stack className="container mx-auto" gap={0}>
      <Group
        justify="space-between"
        align="center"
        className="p-5 rounded-3xl rounded-bl-none border-b-0 rounded-br-none border border-neutral-200 "
      >
        <Stack gap={20}>
          <Group>
            <Avatar
              src={`${process.env.NEXT_PUBLIC_API_DOWNLOAD_FILES_URL}/projects/${projectDetail?.data?.project.projectIcon}`}
              alt={'Project Showcase'}
              className="w-1.5 h-fit md:w-12 md:h-fit"
            />

            <Text className="text-base md:text-base lg:text-4xl" fw={600}>
              {projectDetail?.data?.project.projectName}
            </Text>
          </Group>

          <Text
            className="text-xs md:text-sm lg:text-base w-full md:w-2/3"
            ta="justify"
          >
            {projectDetail?.data?.project.description}
          </Text>

          <Group>
            <Text className="text-gray-400 text-xs md:text-sm lg:text-base ">
              Avaiable on :{' '}
            </Text>
            {projectDetail?.data?.project.platform
              ?.split(',')
              .map((platform: any, index: number) => {
                return (
                  <Text
                    key={platform}
                    fz={'0.75rem'}
                    bg={index % 2 === 0 ? COLORS.secondary : COLORS.third}
                    px={10}
                    py={4}
                    c="white"
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
                !projectDetail?.data?.project.progress
                  ? 0
                  : projectDetail?.data?.project.progress
              }
              radius={'lg'}
              size={'lg'}
              className="w-[300px] h-[18px]"
              color={
                !!projectDetail.data?.project
                  ? projectDetail?.data?.project?.progress > 0 &&
                    projectDetail?.data?.project?.progress < 100
                    ? COLORS.primary
                    : projectDetail?.data?.project.progress === 100
                    ? 'green'
                    : 'gray'
                  : undefined
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
          <ModalForm
            btnText="Invite Member"
            withButton
            title="Invite Member to Project"
          >
            <InviteMemberForm />
          </ModalForm>

          <Group align="end" justify="right">
            <Stack gap={10}>
              <Text className="text-sm text-gray-400 font-medium">
                Teams Project
              </Text>
              <Avatar.Group spacing={'md'}>
                {projectDetail?.data?.project.member?.map(
                  (member: any, index: number) => {
                    if (index < 2) {
                      return (
                        <Tooltip
                          key={index}
                          label={`${member.user?.firstname}`}
                        >
                          <Avatar
                            radius={'xl'}
                            size={45}
                            src={`${process.env.NEXT_PUBLIC_API_DOWNLOAD_FILES_URL}/members/${member.profilePicture}`}
                            className="border border-solid border-gray-300"
                          />
                        </Tooltip>
                      );
                    } else {
                      return (
                        <Avatar
                          key={index}
                          size={45}
                          className="border border-solid border-gray-300"
                        >
                          <Text className="font-normal">
                            +
                            {projectDetail?.data?.project?.member?.length -
                              index}
                          </Text>
                        </Avatar>
                      );
                    }
                  },
                )}
              </Avatar.Group>
            </Stack>
          </Group>
        </Stack>
      </Group>

      <BaseTab>
        <Tabs.Panel value="overview" className="pt-12">
          <OverviewPanel
            projectName={projectDetail.data?.project.projectName}
            projectPrice={projectDetail.data?.project.price}
            deadline={projectDetail.data?.project.endDate}
            task={projectDetail.data?.todos}
            totalTask={projectDetail.data?.project.task.length}
            assignMember={projectDetail.data?.project.member}
            client={{
              name: projectDetail.data?.project?.client?.name,
              address: projectDetail.data?.project?.client?.address,
              phoneNumber: projectDetail.data?.project?.client?.phoneNumber,
            }}
          />
        </Tabs.Panel>

        <Tabs.Panel value="tasks" className="pt-12">
          <TaskPanel
            todos={projectDetail?.data?.todos}
            project={projectDetail.data?.project}
            milestones={milestonesProject.data?.map((milestone: any) => {
              return {
                id: milestone.id,
                milestoneName: milestone.milestoneName,
                endDate: milestone.endDate,
              };
            })}
          />
        </Tabs.Panel>

        <Tabs.Panel value="milestone" className="pt-12">
          <MilestonePanel isRolePM={true} />
        </Tabs.Panel>
      </BaseTab>
    </Stack>
  );
};

export default ProjectDetail;
