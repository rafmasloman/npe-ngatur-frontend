import { ActionIcon, Card, CardProps, Group, Stack, Text } from '@mantine/core';
import { ReactNode } from 'react';

interface IPayrollDashboardCardProps extends CardProps {
  icon?: ReactNode;
  description: string;
  totalData: number | string;
}

const PayrollDashboardCard = ({
  icon,
  description,
  totalData,
  ...props
}: IPayrollDashboardCardProps) => {
  return (
    <Card className="w-fit h-full" shadow="xs" radius={'lg'} {...props}>
      <Group
        gap={150}
        align="center"
        className="h-full"
        justify="space-between"
      >
        <ActionIcon
          variant="filled"
          color="rgba(240, 240, 240, 1)"
          radius={'md'}
          size={50}
        >
          {icon}
        </ActionIcon>

        <Stack gap={16} justify="end" align="end">
          <Text className="text-base text-neutral-400">{description}</Text>
          <Text className="font-semibold text-2xl">{totalData}</Text>
        </Stack>
      </Group>
    </Card>
  );
};

export default PayrollDashboardCard;
