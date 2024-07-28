import { useQuery } from '@tanstack/react-query';
import { GET_ALL_TASKS } from '../../../constant/query_key';
import taskService from '../TaskService';
import { useEffect } from 'react';

interface QueryTasksOption {
  onSuccesCb: (data: any) => void;
  onErrorCb: (error: Error) => void;
}

export const useQueryAllTasks = ({
  onSuccesCb,
  onErrorCb,
}: QueryTasksOption) => {
  const query = useQuery({
    queryKey: [GET_ALL_TASKS],
    queryFn: () => taskService.getAllTask(),
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
