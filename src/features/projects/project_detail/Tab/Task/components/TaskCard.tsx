import {
  Avatar,
  Badge,
  Card,
  Divider,
  Drawer,
  Group,
  Menu,
  Space,
  Stack,
  Text,
  Tooltip,
  rem,
} from '@mantine/core';
import { IconPencil } from '@tabler/icons-react';
import ModalDelete from '../../../../../common/components/ModalDelete';
import { COLORS } from '../../../../../../constant/colors';
import { ICMilestone } from '../../../../../../assets/icons/nav-icon/milestone.icon';
import { useDragItem } from '../hooks/useDragTask';
import ActionMenu from '../../../../../common/components/ActionMenu';
import { ReactNode, useState } from 'react';
import { IconTrash } from 'tabler-icons';
import { useDisclosure } from '@mantine/hooks';
import { AiOutlineFieldTime } from 'react-icons/ai';
import { HiOutlineChatBubbleLeftRight } from 'react-icons/hi2';
import moment from 'moment';
import CommentDrawer from './CommentDrawer';
import useDeleteTask from '../../../../../../services/task/hooks/useDeleteTask';
import TaskModalForm from './TaskModalForm';
import ModalForm from '../../../components/ModalForm';
import { useQueryTaskComments } from '../../../../../../services/comment/hooks/useQueryTaskComments';

interface ITaskCardProps {
  taskData?: {
    id?: string;
    member: IMemberTaskCardProps[];
    text: string;
    deadline: string;
    badgeStyles?: {
      color: string;
      backgroundColor: string;
    };
    comment?: any;
    status: string;
    priority: string;
    milestone?: { id: string; milestoneName: string };
  };
  actions?: {
    onEdit?: ReactNode;
    onDelete?: ReactNode;
  };
}

interface IMemberTaskCardProps {
  id?: number;
  position: string;
  profilePicture?: string;
  user: IUserMemberTaskCardProps;
}

interface IUserMemberTaskCardProps {
  firstname: string;
  lastname: string;
}

const TaskCard = ({ taskData, actions }: ITaskCardProps) => {
  const [taskId, setTaskId] = useState<number | undefined>(undefined);

  const { isDragging, dragRef } = useDragItem('task', {
    id: taskData?.id,
    text: taskData?.text,
    status: taskData?.status,
  });

  const comments = useQueryTaskComments({
    taskId,
    onSuccesCb(data) {
      return data;
    },
    onErrorCb(error) {},
  });

  const deleteTask = useDeleteTask();

  const [isProjectMenuOpen, setProjectMenuOpen] = useState(false);
  const [openedConfirmation, { open: openModal, close: closeModal }] =
    useDisclosure(false);

  const [openedChat, { open: openChat, close: closeChat }] =
    useDisclosure(false);

  const handleDeleteTask = () => {
    if (taskData?.id) {
      deleteTask.mutate(taskData?.id);
    }
  };

  const handleOpenDrawer = () => {
    setTaskId(Number(taskData?.id));

    openChat();
  };

  const openModalConfirmationDelete = () => {
    openModal();
  };

  return (
    <Card
      radius={'md'}
      shadow="md"
      withBorder
      ref={dragRef as any}
      className={`${
        isDragging
          ? ' border-dashed border-2 border-neutral-400 cursor-move'
          : ' text-opacity-100 border-solid border-2 border-neutral-200'
      } min-w-full h-fit bg-white  bg-opacity-100 `}
      classNames={{
        root: `shadow-none drop-shadow-none`,
      }}
    >
      {/* <ModalForm btnText="Tambah Task" title="Task Form">
        <TaskModalForm
          onSubmit={handleSubmitCreateForm}
          options={{ member: project.member, milestone: milestones }}
        />
      </ModalForm> */}

      <ModalDelete
        title="Task"
        description="Data yang telah dihapus tidak dapat dikembalikan"
        opened={openedConfirmation}
        onClose={closeModal}
        handleDeleteConfirmation={handleDeleteTask}
        handleCloseBtn={closeModal}
      />

      {/* <Modal
        opened={openedModalEdit}
        onClose={handleCloseEdit}
        radius={'lg'}
        padding={25}
        title="Edit Task"
        size={'md'}
        styles={{
          title: {
            width: '100%',
            textAlign: 'center',
            fontSize: '1.25rem',
            fontWeight: 600,
          },
        }}
      >
        <TaskForm
          initialValues={{
            taskId: id,
            name: text,
            priority,
            deadline: new Date(deadline),
            member,
            milestone,
            status,
          }}
          close={closeEdit}
        />
      </Modal>

      <Drawer
        opened={opened}
        onClose={close}
        title={
          <Stack gap={3}>
            <Text className="text-sm text-gray-500 font-medium">
              Task Comment Section
            </Text>
            <Text>{text}</Text>
          </Stack>
        }
        position="right"
        styles={{
          content: {
            backgroundColor: '#E7F1FF',
          },
          header: {
            backgroundColor: 'white',
            borderBottom: 'solid',
            borderBottomWidth: 1,
            borderColor: COLORS.GRAY,
            marginBottom: 20,
          },
        }}
      >
        <CommentLayout taskId={taskId!} />
      </Drawer> */}

      <Drawer
        opened={openedChat}
        onClose={closeChat}
        title={
          <Stack gap={3}>
            <Text className="text-sm text-gray-500 font-medium">
              Task Comment Section
            </Text>
            <Text>{taskData?.text}</Text>
          </Stack>
        }
        styles={{
          content: {
            backgroundColor: '#E7F1FF',
          },
          header: {
            backgroundColor: 'white',
            borderBottom: 'solid',
            borderBottomWidth: 1,
            borderColor: COLORS.gray,
            marginBottom: 20,
          },
        }}
        ff={'poppins'}
      >
        <CommentDrawer taskId={taskId} comments={comments.data} />
      </Drawer>

      <Group justify="space-between" className="w-full">
        <Group>
          <Badge
            color={
              taskData?.priority?.toLowerCase().includes('High'.toLowerCase())
                ? 'red'
                : taskData?.priority
                    ?.toLowerCase()
                    .includes('Medium'.toLowerCase())
                ? 'orange'
                : 'indigo'
            }
          >
            {taskData?.priority?.charAt(0).toUpperCase()! +
              taskData?.priority?.slice(1).toLowerCase()!}
          </Badge>
        </Group>

        <Group justify="space-between" className="cursor-default" bg={'white'}>
          {actions?.onEdit && (
            <ActionMenu
              position="right"
              opened={isProjectMenuOpen}
              setOpened={setProjectMenuOpen}
              actions={{
                onDelete: (
                  <Menu.Item
                    leftSection={<IconTrash size={14} color={COLORS.danger} />}
                    className="text-red-500 text-sm"
                    onClick={openModalConfirmationDelete}
                  >
                    Hapus
                  </Menu.Item>
                ),
                onEdit: actions?.onEdit,
              }}
            />
          )}
        </Group>
      </Group>

      <Space h={rem(16)} />

      <Group className="w-fit">
        <Text fw={500}>{taskData?.text}</Text>
      </Group>

      <Space h={rem(16)} />

      <Avatar.Group className="cursor-default">
        {taskData?.member?.map((m, index) => {
          return (
            <Tooltip
              key={index}
              label={`${m.user?.firstname} ${m.user?.lastname}`}
              withArrow
              color={COLORS.lightblue}
              styles={{
                tooltip: {
                  color: COLORS.deepblue,
                  fontWeight: 600,
                },
              }}
            >
              <Avatar
                radius={'xl'}
                src={`${
                  process.env.NEXT_PUBLIC_API_DOWNLOAD_FILES_URL
                }/members/${m.profilePicture!}`}
                size={27}
              />
            </Tooltip>
          );
        })}
      </Avatar.Group>

      <Divider className="my-3.5" />

      <Group justify="space-between" className="w-full">
        <Group gap="lg">
          <Group gap={5}>
            <AiOutlineFieldTime className="text-lg text-rose-500" />
            <Text fz={rem(12)}>
              {moment(taskData?.deadline).format('DD MMMM YYYY')}
            </Text>
          </Group>

          <Group gap={5} onClick={handleOpenDrawer}>
            <HiOutlineChatBubbleLeftRight className="text-neutral-400 hover:text-primary cursor-pointer" />
            <Text fz={rem(12)} c={COLORS.gray}>
              {comments.data?.length}
            </Text>
          </Group>

          <Tooltip
            ff={'poppins'}
            label={
              <Group gap={5}>
                <Text className="text-xs">Milestone : </Text>
                <Text className="text-xs line-clamp-1">
                  {taskData?.milestone?.milestoneName}
                </Text>
              </Group>
            }
          >
            <div className="flex flex-row gap-1.5 bg-white border border-solid border-neutral-300 rounded-full px-1.5 py-0.5">
              <ICMilestone width={16} height={16} />
              <Text className="text-xs">Milestone</Text>
            </div>
          </Tooltip>
        </Group>

        {/* <TaskStatusMenu id={Number(id)!} /> */}
      </Group>
    </Card>
  );
};

export default TaskCard;
