import { ITaskPanelProps } from './TaskPanel';
import { Box, SimpleGrid, Space, Stack } from '@mantine/core';
import { filterTaskStatus } from '../helpers/task.helper';
import TaskCard from './TaskCard';
import TaskHeaderStatus from './TaskHeaderStatus';
import { COLORS } from '../../../../../../constant/colors';

const TaskAdminPanel = ({
  todos,
}: //   project,
//   milestones,
//   isHaveTeamMembers,
//   userRole,
ITaskPanelProps) => {
  const todo = filterTaskStatus({ todos: todos?.todo, status: 'todo' });
  const on_progress = filterTaskStatus({
    todos: todos?.onprogress,
    status: 'on_progress',
  });
  const completed = filterTaskStatus({
    todos: todos?.completed,
    status: 'completed',
  });

  return (
    <Box className="min-h-screen">
      <Space className="my-8" />

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing={{ base: 20, md: 30 }}>
        <Stack className={`min:w-full`} gap={20}>
          <TaskHeaderStatus
            headerColor={COLORS.todo}
            totalTask={todo?.length}
            text={'Todo'}
          />

          <Stack
            className={`w-full p-1.5 h-fit lg:min-h-screen space-y-[30px] 
               border-2 border-solid border-transparent
            `}
          >
            {todo?.map((t: any) => {
              return (
                <TaskCard
                  key={t.id}
                  id={t.id}
                  deadline={t.endDate!}
                  member={t.member}
                  text={t.name}
                  comment={t.comment}
                  status={t.status}
                  priority={t.priority}
                  milestone={t.milestone}
                />
              );
            })}
          </Stack>
        </Stack>

        {/* <TaskStatusContainer
          isOver={isOverProgress}
          type="On Progress"
          ref={dropOnProgress as any}
          totalTask={on_progress?.length}
        >
          {on_progress?.map((t: any) => {
            return (
              <TaskCard
                key={t.id}
                id={t.id}
                deadline={t.endDate!}
                // member={t.member}
                text={t.name}
                comment={t.comment}
                status={t.status}
                priority={t.priority}
                milestone={t.milestone}
              />
            );
          })}
        </TaskStatusContainer> */}

        <Stack className={`min:w-full`} gap={20}>
          <TaskHeaderStatus
            headerColor={COLORS.on_progress}
            totalTask={on_progress?.length}
            text={'On Progress'}
          />

          <Stack
            className={`w-full p-1.5 h-fit  lg:min-h-screen space-y-[30px] 
               border-2 border-solid border-transparent
            `}
          >
            {on_progress?.map((t: any) => {
              return (
                <TaskCard
                  key={t.id}
                  id={t.id}
                  deadline={t.endDate!}
                  member={t.member}
                  text={t.name}
                  comment={t.comment}
                  status={t.status}
                  priority={t.priority}
                  milestone={t.milestone}
                />
              );
            })}
          </Stack>
        </Stack>

        <Stack className={`min:w-full`} gap={20}>
          <TaskHeaderStatus
            headerColor={COLORS.completed}
            totalTask={completed?.length}
            text={'Completed'}
          />

          <Stack
            className={`w-full p-1.5 h-fit lg:min-h-screen space-y-[30px] 
                 'border-2 border-solid border-transparent'
            `}
          >
            {completed?.map((t: any) => {
              return (
                <TaskCard
                  key={t.id}
                  id={t.id}
                  deadline={t.endDate!}
                  member={t.member}
                  text={t.name}
                  comment={t.comment}
                  status={t.status}
                  priority={t.priority}
                  milestone={t.milestone}
                />
              );
            })}
          </Stack>
        </Stack>
      </SimpleGrid>
    </Box>
  );
};

export default TaskAdminPanel;
