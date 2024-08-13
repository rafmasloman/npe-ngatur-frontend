import { Box, Group, Text } from '@mantine/core';
import { ReactNode } from 'react';

interface ITaskHeaderStatusProps {
  text: string;
  icon?: ReactNode;
  headerColor: string;
  totalTask?: number;
}

const TaskHeaderStatus = ({
  text,
  icon,
  headerColor,
  totalTask,
  ...props
}: ITaskHeaderStatusProps) => {
  return (
    <Group
      {...props}
      bg={'white'}
      className="px-5 py-3 rounded-md shadow-lg border-t-4 border-b-0 border-l-0 border-r-0 border-solid"
      style={{ borderColor: headerColor }}
    >
      {/* {icon} */}
      <Group justify="space-between" className="w-full">
        <Text fz={'1.125rem'} fw={600}>
          {text}
        </Text>

        <div
          className={`${
            text.toLowerCase().includes('todo')
              ? 'bg-amber-500'
              : text.toLowerCase().includes('on progress')
              ? 'bg-cyan-600'
              : 'bg-green-600'
          } rounded-full w-[23px] h-[23px] flex justify-center items-center`}
        >
          <Text className="text-xs text-white">{totalTask}</Text>
        </div>
      </Group>
    </Group>
  );
};

export default TaskHeaderStatus;
