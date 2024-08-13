import { Avatar, Badge, Card, Group, Stack, Text } from '@mantine/core';
import { COLORS } from '../../../constant/colors';

export interface ITaskCardDataProps {
  name: string;
  project: {
    projectIcon: string;
    projectName: string;
  };
  priority: string;
  status: string;
}

const TaskCardDashboard = ({
  name,
  priority,
  project,
  status,
}: ITaskCardDataProps) => {
  const generateStatus = status?.toLowerCase().includes('ToDo'.toLowerCase())
    ? 'orange'
    : status?.toLowerCase().includes('On_Progress'.toLowerCase())
    ? 'indigo'
    : 'green';

  const generatePriority = priority?.toLowerCase().includes('low'.toLowerCase())
    ? 'indigo'
    : priority.toLowerCase().includes('medium')
    ? 'orange'
    : 'red';

  return (
    <Card
      withBorder
      radius={'sm'}
      shadow="xs"
      className=" w-full border-neutral-100 hover:border hover:border-solid hover:border-secondary"
      style={{
        borderStyle: 'solid',
        borderWidth: '0 0 0 12px',
        borderColor: COLORS.secondary,
      }}
    >
      <Group justify="space-between">
        <Stack>
          <Text>{name}</Text>

          <Group gap={10}>
            <Avatar
              src={`${process.env.NEXT_PUBLIC_API_DOWNLOAD_FILES_URL}/projects/${project?.projectIcon}`}
              size={16}
              className="h-fit"
            />
            <Text>{project?.projectName}</Text>
          </Group>
        </Stack>

        <Stack>
          <Group>
            <Text className="text-xs">Priority : </Text>
            <Badge size="sm" color={generatePriority}>
              {priority}
            </Badge>
          </Group>

          <Group>
            <Text className="text-xs">Status : </Text>
            <Badge size="sm" color={generateStatus}>
              {status}
            </Badge>
          </Group>
        </Stack>
      </Group>
    </Card>
  );
};

export default TaskCardDashboard;
