'use client';

import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Group,
  Paper,
  RingProgress,
  SimpleGrid,
  Space,
  Stack,
  Text,
} from '@mantine/core';
import { IconCircleFilled } from '@tabler/icons-react';
import { COLORS } from '../../../../../../constant/colors';
import {
  countStatusTask,
  countTaskPercentage,
  totalPercentTaskCompleted,
} from '../helpers/overview-panel.helper';
import { formatToRupiah } from '../../../../../../utils/currency.utils';
import moment from 'moment';
import RingProgressTask from './RingProgressTask';

interface IOverviewPanelProps {
  projectName?: string;
  projectPrice?: number;
  deadline?: string;
  totalTask?: number;
  projectManager?: {
    name: string;
    position: string;
  };
  task?: {
    todo: any[];
    onprogress: any[];
    completed: any[];
  };
  assignMember?: {
    id: string;
    position: string;
    profilePicture?: string;
    fullname: string;
  }[];
}

const OverviewPanel = (overview: IOverviewPanelProps) => {
  return (
    <Box className="container mx-auto">
      <Text className="font-semibold text-lg md:text-xl">
        Project Overview Panel
      </Text>

      <Space h={20} />

      <Paper className="bg-white flex flex-col md:flex-row items-center w-full md:w-fit gap-x-24 p-7 rounded-2xl border border-neutral-300">
        <Stack gap={20}>
          <Group className="bg-neutral-100 px-5 py-3 rounded-xl">
            <Avatar size={'md'} />

            <Stack gap={0}>
              <Text>Bayu Ajid</Text>
              <Text className="text-sm text-neutral-400">Project Manager</Text>
            </Stack>
          </Group>

          <Group justify="space-between">
            <Text>Project</Text>
            <Text>{overview.projectName}</Text>
          </Group>

          <Group justify="space-between">
            <Text>Harga Project</Text>
            <Text className="font-medium">
              {formatToRupiah(overview.projectPrice)}
            </Text>
          </Group>

          <Group justify="space-between">
            <Text>Deadline</Text>
            <Text className="text-rose-500">
              {moment(overview.deadline).format('DD MMMM YYYY')}
            </Text>
          </Group>
        </Stack>

        <RingProgressTask
          totalCompleted={overview.task?.completed.length}
          totalProgress={overview.task?.onprogress.length}
          totalTodo={overview.task?.todo.length}
          totalTasks={overview.totalTask}
        />

        <Stack>
          <Group justify="space-between">
            <Group>
              <IconCircleFilled style={{ color: COLORS.todo }} size={16} />
              <Text>To Do</Text>
            </Group>

            <Text>{countStatusTask('TODO', overview?.task?.todo)} task</Text>
          </Group>

          <Group justify="space-between">
            <Group>
              <IconCircleFilled
                style={{ color: COLORS.on_progress }}
                size={16}
              />
              <Text>On Progress</Text>
            </Group>

            <Text>
              {countStatusTask('ON_PROGRESS', overview?.task?.onprogress)} task
            </Text>
          </Group>

          <Group justify="space-between">
            <Group>
              <IconCircleFilled style={{ color: COLORS.success }} size={16} />
              <Text>Completed</Text>
            </Group>

            <Text>
              {countStatusTask('COMPLETED', overview?.task?.completed)} task
            </Text>
          </Group>
        </Stack>
      </Paper>

      <Space h={40} />

      <Text className="font-semibold text-lg md:text-xl">Crew Project</Text>

      <Space h={20} />

      <SimpleGrid cols={{ base: 1, md: 4, lg: 5 }}>
        <Card withBorder radius={'lg'}>
          <Stack className="w-full" align="center">
            <Avatar />

            <Stack>
              <Text></Text>
              <Text></Text>
            </Stack>

            <Button fullWidth variant="outline" color="red">
              Remove Member
            </Button>
          </Stack>
        </Card>
      </SimpleGrid>
    </Box>
  );
};

export default OverviewPanel;
