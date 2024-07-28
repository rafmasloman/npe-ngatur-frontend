import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { USER_ADMIN_PAGE } from '../../../constant/page_routes';
import { CREATE_USER, GET_ALL_USERS } from '../../../constant/query_key';
import { useRouter } from 'next/navigation';
import NotificationAdmin from '../../../features/common/components/NotificationAdmin';
import projectService from '../ProjectsService';

const useCreateProject = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const query = useMutation({
    mutationKey: [CREATE_USER],
    mutationFn: projectService.createProject,
    onSuccess(data, variables, context) {
      if (!data.data) {
        NotificationAdmin({
          title: 'User gagal ditambah',
          message: 'Gagal menambah data user',
          status: 'FAILED',
        });
      } else {
        NotificationAdmin({
          title: 'User ditambah',
          message: 'Berhasil menambah data user',
          status: 'SUCCESS',
        });
        queryClient.invalidateQueries({ queryKey: [GET_ALL_USERS] });

        router.push(USER_ADMIN_PAGE);
      }
    },
    onError(error, variables, context) {
      NotificationAdmin({
        title: 'User gagal ditambah',
        message: 'Gagal menambah data user',
        status: 'FAILED',
      });
    },
  });

  return query;
};

export default useCreateProject;
