import { RingProgress, Text } from '@mantine/core';
import {
  countTaskPercentage,
  totalPercentTaskCompleted,
} from '../helpers/overview-panel.helper';
import { COLORS } from '../../../../../../constant/colors';

interface IRingProgressTaskProps {
  totalTodo?: number;
  totalProgress?: number;
  totalCompleted?: number;
  totalTasks?: number;
}

const RingProgressTask = (value: IRingProgressTaskProps) => {
  return (
    <RingProgress
      size={200}
      thickness={25}
      sections={[
        {
          value: !countTaskPercentage(value.totalTodo, value.totalTasks)
            ? 0
            : countTaskPercentage(value.totalTodo, value.totalTasks)!,
          color: COLORS.todo,
        },
        {
          value: !countTaskPercentage(value.totalProgress, value.totalTasks)
            ? 0
            : countTaskPercentage(value.totalProgress, value.totalTasks)!,
          color: COLORS.on_progress,
        },
        {
          value: !countTaskPercentage(value.totalCompleted, value.totalTasks)
            ? 0
            : countTaskPercentage(value.totalCompleted, value.totalTasks)!,
          color: COLORS.completed,
        },
      ]}
      label={
        <Text c="blue" fw={700} ta="center" size="xl">
          {totalPercentTaskCompleted(value.totalTasks, value.totalCompleted)} %
        </Text>
      }
    />
  );
};

export default RingProgressTask;
