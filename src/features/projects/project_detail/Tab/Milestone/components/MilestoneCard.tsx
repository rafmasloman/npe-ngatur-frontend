import {
  Avatar,
  Badge,
  Divider,
  Group,
  Progress,
  Stack,
  Text,
  Tooltip,
} from '@mantine/core';
import { ICDeadline } from '../../../../../../assets/icons/deadlin.icon';
import { IconEdit, IconTrash } from 'tabler-icons';
import { COLORS } from '../../../../../../constant/colors';
import Link from 'next/link';
import { ICTask } from '../../../../../../assets/icons/nav-icon/task.icon';
import moment from 'moment';
import {
  MILESTONE_PM_PAGE,
  PROJECT_PM_PAGE,
} from '../../../../../../constant/page_routes';
import { useParams } from 'next/navigation';
import { ReactNode } from 'react';

interface IMilestoneCardProps {
  milestone: any;
  isRoleAccesable?: boolean;
  actions: {
    onDelete: ReactNode;
    onEdit: ReactNode;
  };
}

const MilestoneCard = ({
  milestone,
  isRoleAccesable,
  actions,
}: IMilestoneCardProps) => {
  const params = useParams<{ project_id: string }>();

  return (
    <Group
      align="start"
      justify="flex-start"
      className={`bg-white border-l-[12px] rounded-xl border border-gray-200 border-solid ${
        milestone.status === 'No task yet'
          ? 'border-l-gray-300'
          : milestone.status === 'To Do'
          ? 'border-l-todo'
          : milestone.status === 'On Progress'
          ? 'border-l-onprogress'
          : 'border-l-success'
      }  py-5 pl-5 pr-12 flex flex-col gap-y-3.5`}
    >
      <Group>
        <Stack gap={5}>
          <Text className="text-lg font-semibold text-blue-950">
            {milestone.milestoneName}
          </Text>
        </Stack>

        <Badge
          color={
            milestone.status === 'No task yet'
              ? 'gray'
              : milestone.status === 'To Do'
              ? 'orange'
              : milestone.status === 'On Progress'
              ? 'indigo'
              : 'green'
          }
        >
          {milestone.status}
        </Badge>
      </Group>

      {/* <Divider /> */}

      <Group className="flex items-center justify-between">
        <Group gap={20}>
          <Group gap={10}>
            <ICDeadline width={20} height={20} />
            <Text>{moment(milestone.endDate).format('DD MMM YY')}</Text>
          </Group>

          {isRoleAccesable && (
            <Divider h={30} w={3} className="rounded-lg" bg={COLORS.deepgray} />
          )}

          {actions.onEdit}

          {isRoleAccesable && (
            <Divider h={30} w={3} className="rounded-lg" bg={COLORS.deepgray} />
          )}

          {actions.onDelete}

          <Divider h={30} w={3} className="rounded-lg" bg={COLORS.deepgray} />

          <Group gap={8} align="center">
            <ICTask primaryColor={COLORS.gray} width={28} height={28} />
            <Text className="text-gray-500">{milestone.task.length} tasks</Text>
          </Group>

          <Divider h={30} w={3} className="rounded-lg" bg={COLORS.deepgray} />

          <Progress.Root
            radius={'lg'}
            size={'lg'}
            className="w-[300px] h-[18px]"
            classNames={{
              label: `text-base text-medium`,
            }}
          >
            <Progress.Section
              value={milestone.progress}
              color={
                milestone.status === 'No task yet'
                  ? 'gray'
                  : milestone.status === 'On Progress'
                  ? 'indigo'
                  : milestone.status === 'Completed'
                  ? 'green'
                  : 'orange'
              }
            >
              <Progress.Label className="text-sm font-normal">
                {!milestone.progress && milestone.status === 'No task yet'
                  ? 'Belum ada task'
                  : `${milestone.progress}%`}
              </Progress.Label>
            </Progress.Section>
          </Progress.Root>
        </Group>
      </Group>
    </Group>
  );
};

export default MilestoneCard;
