import { Group, Paper, Space, Text } from '@mantine/core';
import { ICClient } from '../assets/icons/nav-icon/client.icon';
import { PropsWithChildren, ReactNode } from 'react';

interface IFormAdminLayoutProps extends PropsWithChildren {
  icon?: ReactNode;
  title: string;
}

const FormAdminLayout = ({ title, icon, children }: IFormAdminLayoutProps) => {
  return (
    <Paper
      bg={'white'}
      shadow="sm"
      classNames={{ root: `px-12 py-12 border border-neutral-200` }}
      radius={'lg'}
    >
      <Group align="center" gap={10}>
        <Text className="text-sm md:text-xl font-medium">{title}</Text>
        {icon}
      </Group>

      <Space className="my-5 md:my-10" />

      {children}
    </Paper>
  );
};

export default FormAdminLayout;
