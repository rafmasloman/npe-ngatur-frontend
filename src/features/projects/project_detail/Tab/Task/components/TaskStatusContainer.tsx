import { Stack } from '@mantine/core';
import TaskHeaderStatus from './TaskHeaderStatus';
import { LegacyRef, PropsWithChildren } from 'react';
import { COLORS } from '../../../../../../constant/colors';

interface ITaskStatusContainerProps extends PropsWithChildren {
  isOver: boolean;
  totalTask?: number;
  ref: LegacyRef<HTMLDivElement> | undefined;
  type: 'Todo' | 'On Progress' | 'Completed';
}
const TaskStatusContainer = ({
  isOver,
  type,
  totalTask,
  ref,
  children,
}: ITaskStatusContainerProps) => {
  const generateHeaderColor =
    type === 'Todo'
      ? COLORS.todo
      : type === 'On Progress'
      ? COLORS.on_progress
      : COLORS.completed;

  return (
    <Stack ref={ref} className={`min:w-full`} gap={20}>
      <TaskHeaderStatus
        headerColor={generateHeaderColor}
        totalTask={!totalTask ? 0 : totalTask}
        text={type}
      />

      <Stack
        className={`w-full p-1.5 h-fit lg:min-h-screen space-y-[30px] ${
          isOver
            ? `border-2 border-dashed border-opacity-75  ${
                type === 'Completed'
                  ? 'bg-green-600'
                  : type === 'On Progress'
                  ? 'bg-cyan-500'
                  : 'bg-amber-500'
              } rounded-lg transition duration-700`
            : 'border-2 border-solid border-transparent'
        }`}
      >
        {children}
      </Stack>
    </Stack>
  );
};

export default TaskStatusContainer;
