'use client';

import { Divider, Grid, Group, Stack, Text } from '@mantine/core';
import HeaderTitle from '../../features/dashboard/components/HeaderTitle';
import useQueryMemberProject from '../../services/member/hooks/useQueryMemberProjects';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import BaseBarChart from '../../components/Chart/BaseBarChart';
import ChartContainer from '../../features/projects/project_detail/Tab/Overview/components/ChartContainer';
import EmptyCard from '../../features/dashboard/components/EmptyCard';
import ProjectCardDashboard from '../../features/dashboard/components/ProjectCardDashboard';
import { PROJECT_PM_PAGE } from '../../constant/page_routes';
import MilestoneCardDashboard from '../../features/dashboard/components/MilestoneCardDashboard';
import TaskCardDashboard from '../../features/dashboard/components/TaskCardDashboard';

const ProjectManagerDashboard = () => {
  const user = useContext(AuthContext);

  const memberProject = useQueryMemberProject(user.user?.id);

  return (
    <Stack className="container mx-auto" gap={30}>
      <Stack gap={7}>
        <Text className="text-lg sm:text-xl md:text-2xl font-semibold">
          Hi, {user.user?.firstname} {user.user?.lastname}
        </Text>

        <Text className="text-lg sm:text-xl md:text-2xl font-semibold">
          Welcome to your workspace
        </Text>
      </Stack>

      <Divider />

      <Grid gutter={70}>
        <Grid.Col span={{ base: 12, md: 7 }}>
          <Stack className="w-full " align="start" gap={'lg'}>
            <HeaderTitle href={PROJECT_PM_PAGE} title="Your Projects" />

            <Group className="w-full">
              {memberProject.data?.member?.project?.length <= 0 ? (
                <EmptyCard label="project" />
              ) : (
                memberProject.data?.member?.project?.map((project: any) => {
                  return <ProjectCardDashboard key={project.id} {...project} />;
                })
              )}
            </Group>
          </Stack>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 5 }}>
          <Stack className="w-full " align="start" gap={'lg'}>
            <HeaderTitle
              href={`/project-manager/projects`}
              title="Your Milestone"
            />
            {memberProject.data?.member?.milestone?.length <= 0 ? (
              <EmptyCard label="milestone" />
            ) : (
              memberProject.data?.member?.milestone?.map((milestone: any) => {
                return (
                  <MilestoneCardDashboard key={milestone.id} {...milestone} />
                );
              })
            )}
          </Stack>
        </Grid.Col>
      </Grid>

      <Grid gutter={70}>
        <Grid.Col span={{ base: 12, md: 8 }}>
          <ChartContainer title="Task by Priority">
            <BaseBarChart
              data={[
                {
                  priority: 'High',
                  Completed: 2,
                  On_Progress: 9,
                  Todo: 20,
                },
                {
                  priority: 'Medium',
                  Completed: 0,
                  On_Progress: 12,
                  Todo: 16,
                },
                {
                  priority: 'Low',
                  Completed: 5,
                  On_Progress: 8,
                  Todo: 24,
                },
              ]}
              dataKey="priority"
              series={[
                { name: 'Completed', color: 'violet.6' },
                { name: 'On_Progress', color: 'blue.6' },
                { name: 'Todo', color: 'teal.6' },
              ]}
            />
          </ChartContainer>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Stack className="w-full  h-full" align="start" gap={'lg'}>
            <HeaderTitle title="Tasks" />
            {memberProject.data?.member?.task?.length <= 0 ? (
              <EmptyCard label="task" />
            ) : (
              memberProject.data?.member?.task?.map((task: any) => {
                return <TaskCardDashboard key={task.id} {...task} />;
              })
            )}
          </Stack>
        </Grid.Col>
      </Grid>
    </Stack>
  );
};

export default ProjectManagerDashboard;
