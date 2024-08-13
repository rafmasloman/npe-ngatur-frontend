import { Avatar, Group, Stack, StackProps, Text } from '@mantine/core';
import { FcSimCardChip } from 'react-icons/fc';
import { MasterCardLogo } from '../../../assets/images';
import { formatToRupiah } from '../../../utils/currency.utils';
import { ReactNode } from 'react';

interface IBalanceCardPropsType extends StackProps {
  balance?: number;
  items?: { label?: string; value?: string }[];
  title: string;
  children?: ReactNode;
}

const BalanceCard = ({
  balance,
  items,
  title,
  ...props
}: IBalanceCardPropsType) => {
  return (
    <Stack gap={20} justify="space-between" {...props}>
      <Group justify="space-between" align="center">
        <FcSimCardChip className="text-3xl md:text-4xl lg:text-6xl" />
        <Avatar src={MasterCardLogo.src} className="h-fit w-10 md:w-16" />
      </Group>

      <Stack justify="space-between" gap={5} className="w-full text-white">
        <Text className="font-medium text-base md:text-xl">{title}</Text>
        <Text className="font-semibold text-xl md:text-4xl">
          {formatToRupiah(balance)}
        </Text>
      </Stack>

      <Group justify="space-between" mt={!items ? '' : 'xl'}>
        {items?.map((item, index) => {
          return (
            <Stack gap={5} key={index}>
              <Text className="text-neutral-300 text-xs md:text-sm">
                {item.label}
              </Text>
              <Text className="text-white text-sm md:text-base">
                {item.value}
              </Text>
            </Stack>
          );
        })}
      </Group>
    </Stack>
  );
};

export default BalanceCard;
