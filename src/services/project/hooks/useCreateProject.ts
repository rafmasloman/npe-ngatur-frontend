import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  PROJECTS_ADMIN_PAGE,
  USER_ADMIN_PAGE,
} from '../../../constant/page_routes';
import {
  CREATE_PROJECT,
  CREATE_USER,
  GET_ALL_PROJECTS,
  GET_ALL_USERS,
} from '../../../constant/query_key';
import { useRouter } from 'next/navigation';
import NotificationAdmin from '../../../features/common/components/NotificationAdmin';
import projectService from '../ProjectsService';

const useCreateProject = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const query = useMutation({
    mutationKey: [CREATE_PROJECT],
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
          title: 'Project ditambah',
          message: 'Berhasil menambah data Project',
          status: 'SUCCESS',
        });
        queryClient.invalidateQueries({ queryKey: [GET_ALL_PROJECTS] });

        router.push(PROJECTS_ADMIN_PAGE);
      }
    },
    onError(error, variables, context) {
      NotificationAdmin({
        title: 'Project gagal ditambah',
        message: 'Gagal menambah data Project',
        status: 'FAILED',
      });
    },
  });

  return query;
};

export default useCreateProject;
