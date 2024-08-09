import { useQuery } from '@tanstack/react-query';
import { GET_ALL_TASKS, GET_DETAIL_TASK } from '../../../constant/query_key';
import taskService from '../TaskService';
import { useEffect } from 'react';

interface QueryTasksOption {
  taskId?: string;
  onSuccesCb: (data: any) => void;
  onErrorCb: (error: Error) => void;
}

export const useQueryTaskDetail = ({
  taskId,
  onSuccesCb,
  onErrorCb,
}: QueryTasksOption) => {
  const query = useQuery({
    queryKey: [GET_DETAIL_TASK, taskId],
    queryFn: () => taskService.getTaskDetail(taskId),
    select(data) {
      return data.data;
    },
    enabled: !!taskId,
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
