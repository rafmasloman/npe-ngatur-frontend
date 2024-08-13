import { Avatar, Card, Group, Progress, Stack, Text } from '@mantine/core';
import Image from 'next/image';
import { COLORS } from '../../../constant/colors';

interface IMilestoneCardDashboardProps {
  milestoneName: string;
  description: string;
  project: {
    projectIcon: string;
    projectName: string;
  };
}

const MilestoneCardDashboard = ({
  milestoneName,
  description,
  project,
}: IMilestoneCardDashboardProps) => {
  return (
    <Card
      style={{
        position: 'relative',
        borderStyle: 'solid',
        borderWidth: '0 0 0 10px',
        borderColor: COLORS.third,
      }}
      w={'100%'}
      pl={24}
      pr={16}
      py={16}
    >
      <Group w={'100%'} justify="space-between">
        <Stack gap={'xs'}>
          <Text>{milestoneName}</Text>
          <Text c={COLORS.gray} fz={'0.875rem'}>
            {description}
          </Text>
        </Stack>

        <Stack gap={10} align="end">
          <Group align="center" gap={7}>
            <Avatar
              src={`${process.env.NEXT_PUBLIC_API_DOWNLOAD_FILES_URL}/projects/${project?.projectIcon}`}
              size={20}
              className="h-fit"
            />
            <Text className="text-sm">{project?.projectName}</Text>
          </Group>
          <Avatar style={{ zIndex: 3 }} radius={'xl'} size={30} />
        </Stack>
      </Group>
    </Card>
  );
};

export default MilestoneCardDashboard;
