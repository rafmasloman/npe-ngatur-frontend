import {
  Box,
  Divider,
  LoadingOverlay,
  Menu,
  Modal,
  SimpleGrid,
  Space,
  Stack,
  Text,
} from '@mantine/core';
import useUpdateTaskStatus from '../../../../../../services/task/hooks/useUpdateTaskStatus';
import { useDropTask } from '../hooks/useDropTask';
import { filterTaskStatus } from '../helpers/task.helper';
import TaskCard from './TaskCard';
import TaskHeaderStatus from './TaskHeaderStatus';
import { COLORS } from '../../../../../../constant/colors';
import TaskStatusContainer from './TaskStatusContainer';
import { ITodosTaskResponse } from '../../../../../../services/project/ProjectsInterface';
import ModalForm from '../../../components/ModalForm';
import TaskModalForm from './TaskModalForm';
import useCreateTask from '../../../../../../services/task/hooks/useCreateTask';
import { useConfirmationModal } from '../../../../../common/hooks/useConfirmationModal';
import { IconPencil } from 'tabler-icons';
import { useEffect, useState } from 'react';
import { useQueryTaskDetail } from '../../../../../../services/task/hooks/useQueryTaskDetail';
import { useDisclosure } from '@mantine/hooks';
import useUpdateTask from '../../../../../../services/task/hooks/useUpdateTask';
import { usePathname } from 'next/navigation';

export interface ITaskPanelProps {
  todos?: {
    todo?: ITodosTaskResponse[];
    onprogress?: ITodosTaskResponse[];
    completed?: ITodosTaskResponse[];
  };
  project?: any;
  milestones?: {
    id: string;
    milestoneName: string;
    endDate: string;
  }[];
  isHaveTeamMembers?: any;
  userRole?: any;
}

// interface ITaskProjectDetailData {
//   endDate: string;
//   id: number;
//   member: any;
//   milestone: string;
//   milestoneId: string;
//   name: string;
//   priority: string;
//   projectId: string;
//   status: string;
// }

const TaskPanel = ({
  todos,
  project,
  milestones,
  isHaveTeamMembers,
  userRole,
}: ITaskPanelProps) => {
  const pathname = usePathname();

  const [taskId, setTaskId] = useState<string | undefined>(undefined);
  const [opened, { close, open }] = useDisclosure(false);
  const [taskDetail, setTaskDetail] = useState<any>();

  const modal = useConfirmationModal();

  const { mutate: updateStatus } = useUpdateTaskStatus();
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const detailTask = useQueryTaskDetail({
    taskId: taskId,
    onSuccesCb(data) {
      if (data) {
        setTaskDetail(data);
      } else {
        setTaskDetail(null);
      }
    },
    onErrorCb(error) {
      setTaskDetail(null);
    },
  });

  const handleOnDrop = (text: string, id: number, status: string) => {
    updateStatus({ id, status });
  };

  const { isOver: isOverTodo, dropRef: dropTodo } = useDropTask(
    { acceptType: 'task', dropType: 'TODO' },
    handleOnDrop,
  );

  const { isOver: isOverProgress, dropRef: dropOnProgress } = useDropTask(
    { acceptType: 'task', dropType: 'ON_PROGRESS' },
    handleOnDrop,
  );

  const { isOver: isOverCompleted, dropRef: dropOnCompleted } = useDropTask(
    { acceptType: 'task', dropType: 'COMPLETED' },
    handleOnDrop,
  );

  const todo = filterTaskStatus({ todos: todos?.todo, status: 'todo' });
  const on_progress = filterTaskStatus({
    todos: todos?.onprogress,
    status: 'on_progress',
  });
  const completed = filterTaskStatus({
    todos: todos?.completed,
    status: 'completed',
  });

  const handleOpenEditModal = (taskId: string) => {
    setTaskId(taskId);

    open();
  };

  const handleCloseEditModal = () => {
    setTaskId(undefined);
    setTaskDetail(null);

    close();
  };

  const handleSubmitCreateForm = (values: any) => {
    const payload = {
      name: values.name,
      projectId: project.id,
      milestoneId: Number(values.milestoneId),
      member: values.member,
      endDate: values.endDate,
      status: values.status,
      priority: values.priority,
    };

    createTask.mutate(payload);
  };

  const handleSubmitEditForm = (values: any) => {
    const payload = {
      name: values.name,
      projectId: project.id,
      milestoneId: Number(values.milestoneId),
      member: values.member,
      endDate: values.endDate,
      status: values.status,
      priority: values.priority,
    };

    if (!!taskId) {
      updateTask.mutate({ taskId: taskId, payload });
    }
  };

  return (
    <Box className="min-h-screen">
      {pathname.includes('project-manager') && (
        <ModalForm btnText="Tambah Task" title="Task Form" withButton>
          <TaskModalForm
            onSubmit={handleSubmitCreateForm}
            options={{ member: project.member, milestone: milestones }}
          />
        </ModalForm>
      )}

      {pathname.includes('project-manager') && (
        <Modal
          onClose={handleCloseEditModal}
          opened={opened}
          title={'Edit Task'}
          radius={'lg'}
          padding={25}
          size={'md'}
          classNames={{
            body: `font-poppins`,
            title: `w-full text-center text-lg font-semibold`,
          }}
          styles={{
            title: {
              fontFamily: 'poppins',
            },
          }}
        >
          {!taskDetail ? (
            <>
              <LoadingOverlay
                visible={true}
                zIndex={1000}
                overlayProps={{ radius: 'sm', blur: 2 }}
                loaderProps={{ color: 'pink', type: 'bars' }}
              />
            </>
          ) : (
            <TaskModalForm
              onSubmit={handleSubmitEditForm}
              options={{ member: project.member, milestone: milestones }}
              initialValues={{
                name: taskDetail?.name,
                priority: taskDetail?.priority,
                deadline: taskDetail?.endDate,
                status: taskDetail?.status,
                member: taskDetail?.member,
                milestone: taskDetail?.milestone,
              }}
            />
          )}
        </Modal>
      )}

      <Space className="my-8" />

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing={{ base: 20, md: 30 }}>
        {/* <TaskStatusContainer
          isOver={isOverTodo}
          type="Todo"
          ref={dropTodo as any}
          totalTask={todo?.length}
        >
          {todo?.map((t: any) => {
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

        <Stack ref={dropTodo as any} className={`min:w-full`} gap={20}>
          <TaskHeaderStatus
            headerColor={COLORS.todo}
            totalTask={todo?.length}
            text={'Todo'}
          />

          <Stack
            className={`w-full p-1.5 h-fit lg:min-h-screen space-y-[30px] ${
              isOverTodo
                ? `border-2 border-dashed border-opacity-75  border-amber-500 rounded-lg transition duration-700`
                : 'border-2 border-solid border-transparent'
            }`}
          >
            {todo?.map((t: any) => {
              return (
                <TaskCard
                  key={t.id}
                  taskData={{
                    id: t.id,
                    deadline: t.endDate,
                    member: t.member,
                    text: t.name,
                    comment: t.comment,
                    status: t.status,
                    priority: t.priority,
                    milestone: t.milestone,
                  }}
                  actions={{
                    onEdit: pathname.includes('project-manager') && (
                      <Menu.Item
                        leftSection={
                          <IconPencil size={14} color={COLORS.secondary} />
                        }
                        className="text-blue-950 text-sm"
                        onClick={() => handleOpenEditModal(t.id)}
                      >
                        Edit
                      </Menu.Item>
                    ),
                  }}
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

        <Stack ref={dropOnProgress as any} className={`min:w-full`} gap={20}>
          <TaskHeaderStatus
            headerColor={COLORS.on_progress}
            totalTask={on_progress?.length}
            text={'On Progress'}
          />

          <Stack
            className={`w-full p-1.5 h-fit  lg:min-h-screen space-y-[30px] ${
              isOverProgress
                ? `border-2 border-dashed border-opacity-75  border-cyan-500 rounded-lg transition duration-700`
                : 'border-2 border-solid border-transparent'
            }`}
          >
            {on_progress?.map((t: any) => {
              return (
                <TaskCard
                  key={t.id}
                  taskData={{
                    id: t.id,
                    deadline: t.endDate,
                    member: t.member,
                    text: t.name,
                    comment: t.comment,
                    status: t.status,
                    priority: t.priority,
                    milestone: t.milestone,
                  }}
                  actions={{
                    onEdit: pathname.includes('project-manager') && (
                      <Menu.Item
                        leftSection={
                          <IconPencil size={14} color={COLORS.secondary} />
                        }
                        className="text-blue-950 text-sm"
                        onClick={() => handleOpenEditModal(t.id)}
                      >
                        Edit
                      </Menu.Item>
                    ),
                  }}
                />
              );
            })}
          </Stack>
        </Stack>

        {/* <TaskStatusContainer
          isOver={isOverCompleted}
          ref={dropOnCompleted as any}
          totalTask={completed?.length}
          type="Completed"
        >
          {completed?.map((t: any) => {
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

        <Stack ref={dropOnCompleted as any} className={`min:w-full`} gap={20}>
          <TaskHeaderStatus
            headerColor={COLORS.completed}
            totalTask={completed?.length}
            text={'Completed'}
          />

          <Stack
            className={`w-full p-1.5 h-fit lg:min-h-screen space-y-[30px] ${
              isOverCompleted
                ? `border-2 border-dashed border-opacity-75  border-green-600 rounded-lg transition duration-700`
                : 'border-2 border-solid border-transparent'
            }`}
          >
            {completed?.map((t: any) => {
              return (
                <TaskCard
                  key={t.id}
                  taskData={{
                    id: t.id,
                    deadline: t.endDate,
                    member: t.member,
                    text: t.name,
                    comment: t.comment,
                    status: t.status,
                    priority: t.priority,
                    milestone: t.milestone,
                  }}
                  actions={{
                    onEdit: pathname.includes('project-manager') && (
                      <Menu.Item
                        leftSection={
                          <IconPencil size={14} color={COLORS.secondary} />
                        }
                        className="text-blue-950 text-sm"
                        onClick={() => handleOpenEditModal(t.id)}
                      >
                        Edit
                      </Menu.Item>
                    ),
                  }}
                />
              );
            })}
          </Stack>
        </Stack>
      </SimpleGrid>
    </Box>
  );
};

export default TaskPanel;
