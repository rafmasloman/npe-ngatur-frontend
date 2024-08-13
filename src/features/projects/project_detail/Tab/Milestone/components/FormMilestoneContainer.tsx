import { Group, Paper, Space, Text } from '@mantine/core';
import { PropsWithChildren, ReactNode } from 'react';

interface IFormMilestoneContainerProps extends PropsWithChildren {
  icon?: ReactNode;
  title: string;
}

const FormMilestoneContainer = ({
  title,
  icon,
  children,
}: IFormMilestoneContainerProps) => {
  return (
    <Paper
      bg={'transparent'}
      //   shadow="sm"
      //   classNames={{ root: `px-8 py-8 ` }}
      radius={'lg'}
    >
      <Group align="center" gap={10}>
        <Text className="text-sm md:text-xl lg:text-2xl font-semibold">
          {title}
        </Text>
        {icon}
      </Group>

      <Space className="my-5 md:my-10" />

      {children}
    </Paper>
  );
};

export default FormMilestoneContainer;
