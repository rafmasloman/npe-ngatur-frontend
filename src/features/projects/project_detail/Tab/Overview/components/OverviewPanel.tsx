'use client';

import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Group,
  Paper,
  RingProgress,
  SimpleGrid,
  Space,
  Stack,
  Table,
  Text,
} from '@mantine/core';
import { IconCircleFilled, IconRun } from '@tabler/icons-react';
import { COLORS } from '../../../../../../constant/colors';
import {
  countStatusTask,
  countTaskPercentage,
  totalPercentTaskCompleted,
} from '../helpers/overview-panel.helper';
import { formatToRupiah } from '../../../../../../utils/currency.utils';
import moment from 'moment';
import RingProgressTask from './RingProgressTask';
import TaskCardOverview from './TaskCard';
import { GoCheckCircle } from 'react-icons/go';
import { PiRocketBold } from 'react-icons/pi';
import { BiPencil } from 'react-icons/bi';
import { BarChart, DonutChart } from '@mantine/charts';
import BaseBarChart from '../../../../../../components/Chart/BaseBarChart';
import BarChartMode from './ChartContainer';
import ChartContainer from './ChartContainer';
import { BsTrash3 } from 'react-icons/bs';
import TableCommon from '../../../../../common/components/TableCommon';
import { MasterCardLogo } from '../../../../../../assets/images';
import { FaMapLocationDot } from 'react-icons/fa6';
import { FcSimCardChip } from 'react-icons/fc';
import BalanceCard from '../../../../../common/components/BalanceCard';
import ModalDelete from '../../../../../common/components/ModalDelete';
import { useConfirmationModal } from '../../../../../common/hooks/useConfirmationModal';
import useRemoveMember from '../../../../../../services/project/hooks/useRemoveMember';
import { useParams } from 'next/navigation';

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
  client?: {
    name?: string;
    address?: string;
    phoneNumber?: string;
  };
  assignMember?: {
    id: string;
    position: string;
    profilePicture?: string;
    user: {
      firstname: string;
      lastname: string;
    };
  }[];
  options?: {
    isProjectManager: boolean;
  };
}

const tableHead = [
  { key: 'fullname', title: 'Nama Member' },
  { key: 'posisi', title: 'Position' },
  { key: 'action', title: 'Action' },
];

const OverviewPanel = (overview: IOverviewPanelProps) => {
  const params = useParams<{ project_id: string }>();

  console.log('overview : ', overview);

  const modal = useConfirmationModal();
  const removeMember = useRemoveMember();

  const handleRemoveMember = () => {
    removeMember.mutate({
      memberId: modal.itemId,
      projectId: params.project_id,
    });

    modal.close();
  };

  const tBody = overview.assignMember?.map((member, index: number) => {
    return (
      <Table.Tr key={index}>
        <Table.Td>
          <Flex direction={'row'} align={'center'} gap={10}>
            <Avatar
              size={25}
              src={!member.profilePicture ? '' : member.profilePicture}
            />

            <Text className="text-base font-medium">{`${member.user.firstname} ${member.user.lastname}`}</Text>
          </Flex>
        </Table.Td>
        <Table.Td>
          <Text className="text-base">{member.position}</Text>
        </Table.Td>
        <Table.Td>
          <ActionIcon color="red" onClick={modal.open}>
            <BsTrash3 />
          </ActionIcon>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <Box className="container mx-auto">
      <ModalDelete
        title="Keluarkan Member?"
        description="Keluarkan member dari project"
        handleCloseBtn={modal.close}
        handleDeleteConfirmation={handleRemoveMember}
        opened={modal.opened}
        onClose={modal.close}
      />

      <Text className="font-semibold text-lg md:text-xl">
        Project Overview Panel
      </Text>

      <Space h={30} />

      <SimpleGrid cols={{ base: 2, md: 4 }}>
        <TaskCardOverview
          title="Todo Tasks"
          badgeColor="pink"
          taskCount={!overview?.task ? 0 : overview.task?.todo?.length}
          icon={<GoCheckCircle className="text-neutral-400 text-xl" />}
        />

        <TaskCardOverview
          title="On Progress Task"
          badgeColor="indigo"
          taskCount={!overview?.task ? 0 : overview.task?.onprogress?.length}
          icon={<BiPencil className="text-neutral-400 text-xl" />}
        />

        <TaskCardOverview
          title="Completed Task"
          badgeColor="green"
          taskCount={!overview?.task ? 0 : overview.task?.completed?.length}
          icon={<PiRocketBold className="text-neutral-400 text-xl" />}
        />

        <TaskCardOverview
          title="Total Task"
          badgeColor="cyan"
          taskCount={!overview?.totalTask ? 0 : overview?.totalTask}
        />
      </SimpleGrid>

      <Space h={50} />

      <Grid>
        <Grid.Col span={{ base: 12, md: 7 }}>
          <ChartContainer title="Status Task dengan Level">
            <BaseBarChart
              ff={'poppins'}
              withLegend
              legendProps={{ verticalAlign: 'bottom', height: 50 }}
              data={[
                {
                  level: 'Low',
                  Todo: 1200,
                  On_Progress: 900,
                  Completed: 200,
                },
                {
                  level: 'Medium',
                  Todo: 1900,
                  On_Progress: 1200,
                  Completed: 400,
                },
                { level: 'High', Todo: 400, On_Progress: 1000, Completed: 200 },
              ]}
              dataKey="level"
              series={[
                {
                  name: 'Completed',
                  color: 'green',
                },
                { name: 'On_Progress', color: 'indigo' },
                {
                  name: 'Todo',
                  color: 'pink',
                },
              ]}
              classNames={{ root: `h-[200px] md:h-[400px]` }}
            />
          </ChartContainer>

          {/* <RingProgressTask
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

                <Text>
                  {countStatusTask('TODO', overview?.task?.todo)} task
                </Text>
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
                  {countStatusTask('ON_PROGRESS', overview?.task?.onprogress)}{' '}
                  task
                </Text>
              </Group>

              <Group justify="space-between">
                <Group>
                  <IconCircleFilled
                    style={{ color: COLORS.success }}
                    size={16}
                  />
                  <Text>Completed</Text>
                </Group>

                <Text>
                  {countStatusTask('COMPLETED', overview?.task?.completed)} task
                </Text>
              </Group>
            </Stack> */}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 5 }}>
          <BalanceCard
            className="w-full h-fit  bg-gradient-to-r from-neutral-600 to-neutral-700 p-4 sm:p-7 rounded-3xl border border-neutral-300"
            balance={overview.projectPrice}
            title="Balance Project"
            items={[
              { label: 'Nama Client', value: overview.client?.name },
              { label: 'Alamat', value: overview.client?.address },
              { label: 'Project', value: overview.projectName },
            ]}
          />
        </Grid.Col>
      </Grid>

      <Space h={40} />

      <SimpleGrid cols={{ base: 1, md: 2 }}>
        <Stack
          bg={'white'}
          className="p-7 border border-neutral-200 rounded-xl overflow-scroll no-scrollbar shadow-xs"
        >
          <Group justify="space-between">
            <Text className="font-semibold text-lg">Crews Project</Text>
          </Group>
          <TableCommon tableBody={tBody} tableHead={tableHead} />
        </Stack>

        <ChartContainer title="Total Task Completed">
          <Flex
            direction={{ base: 'column', sm: 'row' }}
            align={'center'}
            justify={'center'}
            gap={30}
          >
            <DonutChart
              thickness={40}
              size={200}
              chartLabel={`
              ${totalPercentTaskCompleted(
                overview.totalTask,
                overview.task?.completed.length,
              )}%`}
              classNames={{
                label: `text-2xl`,
              }}
              data={[
                {
                  name: 'completed',
                  value: !overview.task?.completed.length
                    ? 0
                    : overview.task?.completed.length,
                  color: COLORS.primary,
                },
                {
                  name: 'incompleted',
                  value:
                    !overview.task?.todo.length ||
                    !overview.task.onprogress.length
                      ? 0
                      : countTaskPercentage(
                          overview.task?.onprogress.length +
                            overview.task?.todo.length,
                          overview.totalTask,
                        )!,
                  color: COLORS.lightblue,
                },
              ]}
            />

            <Flex
              direction={{ base: 'row', md: 'column' }}
              gap={30}
              justify={'center'}
              className=""
            >
              <Stack
                gap={5}
                align="center"
                className="sm:border sm:border-neutral-300 w-[80px]  md:w-[120px] rounded-xl h-[80px] px-2.5 py-2.5 "
              >
                <Text className="text-center text-sm sm:text-base md:text-xl font-semibold text-indigo-500">
                  {overview?.task?.onprogress.length} Task
                </Text>

                <Text className="text-xs sm:text-sm line-clamp-1 sm:line-clamp-none md:text-base text-indigo-500 ">
                  On Progress
                </Text>
              </Stack>

              <Stack
                gap={5}
                align="center"
                className="sm:border sm:border-neutral-300 w-[80px] md:w-[120px] rounded-xl h-[80px] px-2.5 py-2.5 lg:ml-12 xl:ml-20"
              >
                <Text className="text-center text-sm sm:text-base md:text-xl font-semibold text-green-500">
                  {overview?.task?.completed.length} Task
                </Text>
                <Text className="text-xs sm:text-sm line-clamp-1 md:text-base text-green-500">
                  Completed
                </Text>
              </Stack>

              <Stack
                gap={5}
                align="center"
                className="sm:border sm:border-neutral-300 rounded-xl w-[80px] md:w-[120px] h-[80px] px-2.5 py-2.5 lg:ml-24 xl:ml-40"
              >
                <Text className="text-center text-sm sm:text-base md:text-xl font-semibold text-rose-600">
                  {overview?.task?.todo.length} Task
                </Text>
                <Text className="text-xs sm:text-sm line-clamp-1 sm:line-clamp-none md:text-base text-rose-600">
                  Todo
                </Text>
              </Stack>
            </Flex>
          </Flex>
        </ChartContainer>
      </SimpleGrid>

      <Space h={40} />

      {overview.options?.isProjectManager && (
        <Paper className="bg-transparent">
          <Text className="font-semibold text-lg md:text-xl">Crew Project</Text>

          <Space h={20} />

          <SimpleGrid cols={{ base: 1, md: 4, lg: 5 }}>
            {overview.assignMember?.map((member) => {
              return (
                <Card withBorder key={member.id} radius={'lg'}>
                  <Stack className="w-full" align="center">
                    <Avatar />

                    <Stack gap={5} align="center">
                      <Text className="font-medium text-lg text-custom_black">{`${member.user.firstname} ${member.user.lastname}`}</Text>
                      <Text className="text-neutral-500">{`${member.position}`}</Text>
                    </Stack>

                    <Button fullWidth variant="outline" color="red">
                      Remove Member
                    </Button>
                  </Stack>
                </Card>
              );
            })}
          </SimpleGrid>
        </Paper>
      )}
    </Box>
  );
};

export default OverviewPanel;
