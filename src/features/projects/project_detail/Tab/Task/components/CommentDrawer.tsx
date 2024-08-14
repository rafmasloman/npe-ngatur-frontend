import {
  ActionIcon,
  Flex,
  Grid,
  Group,
  ScrollArea,
  Stack,
  Text,
} from '@mantine/core';
import CommentChat from './CommentChat';
import CommentForm from './CommentForm';
import { useQueryTaskComments } from '../../../../../../services/comment/hooks/useQueryTaskComments';
import usePostCommentMessage from '../../../../../../services/comment/hooks/useMutationTaskComment';
import { useContext } from 'react';
import { AuthContext } from '../../../../../../context/AuthContext';

interface ICommentDrawerProps {
  comments: any[];
  taskId?: number;
}

interface ISendMessageData {
  message: string;
  userId: string;
  taskId: number;
}

const CommentDrawer = ({ taskId, comments }: ICommentDrawerProps) => {
  const userId = useContext(AuthContext);

  const sendComment = usePostCommentMessage();

  // console.log('comment success : ', comments.isLoading);

  const handleSendMessage = (values: ISendMessageData) => {
    const params = {
      message: values.message,
      userId: userId.user?.id,
      taskId,
    };

    if (params.taskId && params.userId) {
      sendComment.mutate({
        message: params.message,
        taskId: params.taskId,
        userId: params.userId,
      });
    }
  };

  return (
    <Flex direction={'column'} className="relative  h-[600px] justify-between">
      <ScrollArea h={'100%'}>
        <Stack h={'100vh'}>
          {comments?.length <= 0 ? (
            <Text className="mt-10 text-custom_black font-light text-center text-sm">
              Belum ada komentar
            </Text>
          ) : (
            comments?.map((comment: any) => {
              return (
                <Group
                  key={comment.id}
                  //   position={
                  //     userAccount.user?.id! === comment.userId ? 'right' : 'left'
                  //   }}
                  justify="space-between"
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
            })
          )}
        </Stack>
      </ScrollArea>

      <CommentForm
        isLoading={sendComment.isSuccess}
        onSubmit={handleSendMessage}
      />
    </Flex>
  );
};

export default CommentDrawer;
