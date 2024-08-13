import {
  ActionIcon,
  Flex,
  Grid,
  Group,
  ScrollArea,
  Stack,
} from '@mantine/core';
import CommentChat from './CommentChat';
import CommentForm from './CommentForm';

interface ICommentDrawerProps {
  messageData: any[];
  taskId?: number;
}

interface ISendMessageData {
  message: string;
  userId: string;
  taskId: string;
}

const CommentDrawer = ({ taskId, messageData }: ICommentDrawerProps) => {
  const handleSendMessage = (values: ISendMessageData) => {
    const params = {
      message: values.message,
      userId: '',
      taskId: '',
    };
  };

  return (
    <Flex direction={'column'} className="relative  h-[600px] justify-between">
      <ScrollArea h={'100%'}>
        <Stack className="bg-blue-500">
          {messageData?.map((comment: any) => {
            return (
              <Group
                key={comment.id}
                //   position={
                //     userAccount.user?.id! === comment.userId ? 'right' : 'left'
                //   }
                align="left"
              >
                <CommentChat
                  // userId={comment.userId}
                  message={comment.message}
                  createdAt={comment.createdAt}
                  user={comment.user}
                />
              </Group>
            );
          })}
        </Stack>
      </ScrollArea>

      <CommentForm onSubmit={handleSendMessage} />
    </Flex>
  );
};

export default CommentDrawer;
