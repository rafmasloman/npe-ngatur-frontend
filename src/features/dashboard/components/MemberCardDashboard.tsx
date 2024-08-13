import { Avatar, Card, Flex, Group, Stack, Text } from '@mantine/core';
import { COLORS } from '../../../constant/colors';

interface IMemberCardDashboardProps {
  name: string;
  position: string;
}

const MemberCardDashboard = ({ name, position }: IMemberCardDashboardProps) => {
  return (
    <Card radius={'lg'} withBorder className="w-full bg-white md:w-[370px]">
      <Flex direction={'row'} align={'center'} gap={10}>
        <Avatar size={45} radius={'xl'} />
        <Stack gap={0}>
          <Text fw={500} className="">
            {name}
          </Text>
          <Text fw={500} c={COLORS.gray} fz={'0.875rem'}>
            {position}
          </Text>
        </Stack>
      </Flex>
    </Card>
  );
};

export default MemberCardDashboard;
