import { Avatar, Group, Stack, Text } from '@mantine/core';

interface ICommentChatProps {
  //   userId: string;
  message: string;
  createdAt: string;
  user: IUserCommentChatProps;
}

interface IUserCommentChatProps {
  firstname: string;
  lastname: string;
  member: IMemberCommentChatProps;
}

interface IMemberCommentChatProps {
  position: string;
  profilePicture?: string;
}

const CommentChat = ({
  message,
  user,
  createdAt,
}: //   userId,
ICommentChatProps) => {
  const inputDate = new Date(createdAt);

  const hours = inputDate.getHours();
  const minutes = inputDate.getMinutes();

  const sendTime = `${String(hours).padStart(2, '0')}:${String(
    minutes,
  ).padStart(2, '0')}`;

  return (
    <Group
      bg={'white'}
      p={10}
      className="rounded-lg border border-neutral-300 w-full md:w-3/4"
      justify="space-between"
      align="end"
    >
      <Group gap={10}>
        <Avatar
          src={
            !user.member?.profilePicture
              ? null
              : `${process.env.NEXT_PUBLIC_API_DOWNLOAD_FILES_URL}/members/${user?.member?.profilePicture}`
          }
          size={30}
          radius={'xl'}
        />
        <Stack gap={0}>
          <Text className="text-sm text-gray-500">
            {/* {userAccount?.user?.id! === userId
              ? 'You'
              : `${user?.firstname} ${user?.lastname}`} */}
            {`${user?.firstname} ${user?.lastname}`}
          </Text>
          <Text className="text-[0.875rem]">{message}</Text>
        </Stack>
      </Group>
      <Text className="text-[0.625rem] text-neutral-400">{sendTime}</Text>
    </Group>
  );
};

export default CommentChat;
