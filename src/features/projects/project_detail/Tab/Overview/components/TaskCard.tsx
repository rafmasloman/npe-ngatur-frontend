import { Badge, Card, Group, Stack, Text } from '@mantine/core';
import { ReactNode } from 'react';

interface ITaskCardOverviewProps {
  taskCount: number;
  title: string;
  badgeColor: string;
  icon?: ReactNode;
}

const TaskCardOverview = ({
  title,
  taskCount,
  badgeColor,
  icon,
}: ITaskCardOverviewProps) => {
  return (
    <Card
      ff={'poppins'}
      radius={'lg'}
      withBorder
      className="w-full h-[180px] md:h-[150px]"
    >
      <Stack justify="space-between" className="h-full">
        <Group justify="space-between">
          <Text className=" font-bold text-base md:text-lg line-clamp-1">
            {title}
          </Text>
          {icon}
        </Group>
        <Group align="end" justify="space-between">
          <Stack gap={0}>
            <Text className="text-xs md:text-base">{taskCount}</Text>
            <Text className="text-xs md:text-base">Task count</Text>
          </Stack>

          <Badge
            color={badgeColor}
            classNames={{ label: `text-xs md:text-sm` }}
          >
            Task
          </Badge>
        </Group>
      </Stack>
    </Card>
  );
};

export default TaskCardOverview;
