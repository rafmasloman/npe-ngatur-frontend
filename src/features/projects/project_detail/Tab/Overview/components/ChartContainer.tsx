import { Paper, Space, Text } from '@mantine/core';
import { PropsWithChildren } from 'react';

interface IChartContainerProps extends PropsWithChildren {
  title: string;
}

const ChartContainer = ({ title, children }: IChartContainerProps) => {
  return (
    <Paper className="px-3.5  py-10 md:px-5 md:py-5 border-2 border-neutral-200 rounded-2xl">
      <Text className="font-semibold text-xl">{title}</Text>

      <Space className="h-10" />
      {children}
    </Paper>
  );
};

export default ChartContainer;
