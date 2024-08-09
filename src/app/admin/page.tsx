'use client';

import {
  Box,
  Card,
  Container,
  Flex,
  Grid,
  Group,
  Paper,
  SimpleGrid,
  Space,
  Stack,
  Text,
} from '@mantine/core';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import WelcomeCard from '../../features/dashboard/components/WelcomeCard';
import useQueryProjects from '../../services/project/hooks/useQueryProjects';
import HeaderTitle from '../../features/dashboard/components/HeaderTitle';
import ProjectCardDashboard from '../../features/dashboard/components/ProjectCardDashboard';
import { useQueryAllMilestones } from '../../services/milestone/hooks/useQueryAllMilestone';
import MilestoneCardDashboard from '../../features/dashboard/components/MilestoneCardDashboard';
import TaskCardDashboard from '../../features/dashboard/components/TaskCardDashboard';
import { useQueryAllTasks } from '../../services/task/hooks/useQueryTasks';
import BaseBarChart from '../../components/Chart/BaseBarChart';
import ChartContainer from '../../features/projects/project_detail/Tab/Overview/components/ChartContainer';
import { useQueryAllMembers } from '../../services/member/hooks/useQueryAllMembers';
import MemberCardDashboard from '../../features/dashboard/components/MemberCardDashboard';

const AdminDashboard = () => {
  const admin = useContext(AuthContext);
  const [projectMapping, setProjectMapping] = useState([]);
  const [tasksMapping, setTasksMapping] = useState([]);

  const projects = useQueryProjects({
    onSuccesCb(data) {
      setProjectMapping(data);
    },
    onErrorCb(error) {},
  });

  const milestones = useQueryAllMilestones();
  const members = useQueryAllMembers();

  const tasks = useQueryAllTasks({
    onSuccesCb(data) {
      setTasksMapping(data);
    },
    onErrorCb(error) {},
  });

  const projectChartData = projectMapping.map(
    (data: { projectName: string; task: any }) => {
      return {
        projectName: data.projectName,
        completed: data.task.filter(
          (t: { status: string }) => t.status === 'COMPLETED',
        ).length,
        on_progress: data.task.filter(
          (t: { status: string }) => t.status === 'ON_PROGRESS',
        ).length,
        // todo: data.task.filter((t: { status: string }) => t.status === 'TODO')
        //   .length,
        todo: 10,
      };
    },
  );

  return (
    <Container size={'lg'} className="px-4 mt-0 overflow-hidden lg:-mt-5  ">
      <Space h={40} />

      <Grid gutter={50}>
        <Grid.Col span={{ lg: 6 }}>
          <WelcomeCard name={`${admin.user?.firstname}`} />
        </Grid.Col>

        <Grid.Col span={{ lg: 6 }}>
          <Stack className="w-full " align="start" gap={'lg'}>
            <HeaderTitle href={`/admin/members`} title="Team Members" />
            {members.data?.map((member, id) => {
              return (
                <MemberCardDashboard
                  key={id}
                  name={`${member.user?.firstname} ${member.user?.lastname}`}
                  position={`${member.position}`}
                />
              );
            })}
          </Stack>
        </Grid.Col>

        {/* <Grid.Col span={{ lg: 6 }}>
          <ChartContainer title="Projects">
            <BaseBarChart
              data={projectChartData}
              type="default"
              dataKey="projectName"
              withYAxis={false}
              gridAxis="none"
              series={[
                {
                  name: 'completed',
                  color: 'green',
                },
                { name: 'on_progress', color: 'indigo' },
                {
                  name: 'todo',
                  color: 'pink',
                },
              ]}
            />
          </ChartContainer>
        </Grid.Col> */}
      </Grid>

      <Space className="md:h-10" />

      <Box className="w-full md:w-4/5 lg:w-full">
        <HeaderTitle href={`/project`} title="Projects" />

        <Space h={30} />

        {/* <ScrollArea className="w-screen sm:w-full"> */}
        <Flex direction={'row'} gap={{ base: 20 }}>
          {projectMapping?.map((project: any, index: number) => (
            <ProjectCardDashboard
              key={index}
              id={project.id}
              member={project.member}
              platform={project.platform}
              projectName={project.projectName}
              endDate={project.endDate}
              projectIcon={project.projectIcon}
              task={project.task}
            />
          ))}
        </Flex>
        {/* </ScrollArea> */}
      </Box>

      <SimpleGrid
        cols={{
          base: 1,
          lg: 2,
        }}
        spacing={70}
      >
        <Box>
          <HeaderTitle href={`/milestone`} title="Milestone" />
          <Space h={'xl'} />

          <Group>
            {milestones?.data?.length <= 0 ? (
              <Card
                withBorder
                shadow="sm"
                radius={'md'}
                className="bg-neutral-200 w-full"
              >
                <Text className="text-neutral-400">No Milestone for now</Text>
              </Card>
            ) : (
              milestones?.data?.map((milestone: any, index: number) => {
                return (
                  <MilestoneCardDashboard
                    key={index}
                    milestoneName={milestone.milestoneName}
                    description={
                      !milestone.description
                        ? 'No Description for this milestone'
                        : milestone.description
                    }
                    project={{
                      projectIcon: milestone.project.projectIcon,
                      projectName: milestone.project.projectName,
                    }}
                  />
                );
              })
            )}
          </Group>
        </Box>

        <Box>
          <HeaderTitle href={`/admin/tasks`} title="Task" />
          <Space h={'xl'} />

          <Stack>
            {tasksMapping?.length <= 0 ? (
              <Card
                withBorder
                shadow="sm"
                radius={'md'}
                className="bg-gray-200"
              >
                <Text className="text-gray-400">No Tasks for now</Text>
              </Card>
            ) : (
              tasksMapping?.map((task: any, index: number) => {
                return (
                  <TaskCardDashboard
                    key={index}
                    project={{
                      projectIcon: task.project.projectIcon,
                      projectName: task.project.projectName,
                    }}
                    status={task.status}
                    name={task.name}
                    priority={task.priority}
                  />
                );
              })
            )}
          </Stack>
        </Box>
      </SimpleGrid>
    </Container>
  );
};

export default AdminDashboard;
