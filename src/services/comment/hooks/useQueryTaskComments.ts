import { useQuery } from '@tanstack/react-query';
import commentService from '../CommentService';
import { useEffect } from 'react';
import { GET_TASK_COMMENTS } from '../../../constant/query_key';

interface QueryCommentsOption {
  taskId?: number;
  onSuccesCb: (data: any) => void;
  onErrorCb: (error: Error) => void;
}

export const useQueryTaskComments = ({
  taskId,
  onSuccesCb,
  onErrorCb,
}: QueryCommentsOption) => {
  const query = useQuery({
    queryKey: [GET_TASK_COMMENTS, taskId],
    queryFn: () => commentService.getCommentByTask(taskId),
    // enabled: !!taskId,
    select(data) {
      return data.data;
    },
  });

  useEffect(() => {
    if (query.isError) {
      onErrorCb(query.error);
    }
  }, [query.isError, query.error, onErrorCb]);

  useEffect(() => {
    if (query.isSuccess && query.data) {
      onSuccesCb(query.data);
    }
  }, [query.isSuccess, query.data, onSuccesCb]);

  return query;
};
