import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  MEMBER_ADMIN_PAGE,
  TASK_PM_PAGE,
  USER_ADMIN_PAGE,
} from '../../../constant/page_routes';
import {
  CREATE_TASK,
  GET_ALL_TASKS,
  GET_DETAIL_PROJECT,
  GET_MILESTONE_PROJECTS,
} from '../../../constant/query_key';
import { useRouter } from 'next/navigation';
import NotificationAdmin from '../../../features/common/components/NotificationAdmin';
import taskService from '../TaskService';

const useCreateTask = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const query = useMutation({
    mutationKey: [CREATE_TASK],
    mutationFn: taskService.createTask,
    onSuccess(data, variables, context) {
      if (!data.data) {
        NotificationAdmin({
          title: 'Task gagal ditambah',
          message: 'Gagal menambah data Task',
          status: 'FAILED',
        });
      } else {
        NotificationAdmin({
          title: 'Task ditambah',
          message: 'Berhasil menambah data Task',
          status: 'SUCCESS',
        });
        queryClient.invalidateQueries({ queryKey: [GET_DETAIL_PROJECT] });
        queryClient.invalidateQueries({ queryKey: [GET_MILESTONE_PROJECTS] });
      }
    },
    onError(error, variables, context) {
      NotificationAdmin({
        title: 'Task gagal ditambah',
        message: 'Gagal menambah data Task',
        status: 'FAILED',
      });
    },
  });

  return query;
};

export default useCreateTask;
