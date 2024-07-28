import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  GET_TASK_COMMENTS,
  SEND_TASK_COMMENT,
} from '../../../constant/query_key';
import commentService from '../CommentService';

const usePostCommentMessage = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: [SEND_TASK_COMMENT],
    mutationFn: commentService.sendCommentMessage,
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: [GET_TASK_COMMENTS] });
    },
    onError(error, variables, context) {},
  });

  return mutation;
};

export default usePostCommentMessage;
