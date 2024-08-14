import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  GET_DETAIL_PROJECT,
  GET_TASK_COMMENTS,
  SEND_TASK_COMMENT,
} from '../../../constant/query_key';
import commentService from '../CommentService';
import NotificationAdmin from '../../../features/common/components/NotificationAdmin';

const usePostCommentMessage = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: [SEND_TASK_COMMENT],
    mutationFn: commentService.sendCommentMessage,
    onSuccess(data, variables, context) {
      if (!data.data) {
        NotificationAdmin({
          title: 'Komentar gagal terkirim',
          message: 'Gagal mengirim Komentar',
          status: 'FAILED',
        });
      } else {
        NotificationAdmin({
          title: 'Komentar terkirim',
          message: 'Berhasil mengirim Komentar',
          status: 'SUCCESS',
        });
        queryClient.invalidateQueries({ queryKey: [GET_DETAIL_PROJECT] });
        queryClient.invalidateQueries({ queryKey: [GET_TASK_COMMENTS] });
      }
    },
    onError(error, variables, context) {
      NotificationAdmin({
        title: 'Komentar gagal terkirim',
        message: 'Gagal mengirim Komentar',
        status: 'FAILED',
      });
    },
  });

  return mutation;
};

export default usePostCommentMessage;
