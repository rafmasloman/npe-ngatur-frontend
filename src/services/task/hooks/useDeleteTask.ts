import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DELETE_TASK, GET_DETAIL_PROJECT } from '../../../constant/query_key';
import NotificationAdmin from '../../../features/common/components/NotificationAdmin';
import taskService from '../TaskService';

const useDeleteTask = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: [DELETE_TASK],
    mutationFn: taskService.deleteTask,
    onSuccess(data, variables, context) {
      if (!data) {
        NotificationAdmin({
          title: 'Task gagal terhapus',
          message: 'Gagal menghapus Task',
          status: 'FAILED',
        });
      } else {
        NotificationAdmin({
          title: 'Task terhapus',
          message: 'Berhasil menghapus Task',
          status: 'SUCCESS',
        });
        queryClient.invalidateQueries({ queryKey: [GET_DETAIL_PROJECT] });

        // router.push(PROJECTS_ADMIN_PAGE);
      }
    },
    onError(error, variables, context) {
      NotificationAdmin({
        title: 'Task gagal terhapus',
        message: 'Gagal menghapus data Task',
        status: 'FAILED',
      });
    },
  });

  return mutation;
};

export default useDeleteTask;
