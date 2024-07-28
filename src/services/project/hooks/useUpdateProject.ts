import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  PROJECTS_ADMIN_PAGE,
  USER_ADMIN_PAGE,
} from '../../../constant/page_routes';
import {
  GET_ALL_MEMBERS,
  GET_ALL_PROJECTS,
  GET_DETAIL_MEMBER,
  GET_DETAIL_PROJECT,
  UPDATE_MEMBER,
  UPDATE_PROJECT,
} from '../../../constant/query_key';
import { useRouter } from 'next/navigation';
import NotificationAdmin from '../../../features/common/components/NotificationAdmin';
import projectService from '../ProjectsService';

const useUpdateProject = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const query = useMutation({
    mutationKey: [UPDATE_PROJECT],
    mutationFn: projectService.updateProject,
    onSuccess(data, variables, context) {
      if (!data.data) {
        NotificationAdmin({
          title: 'Project gagal diubah',
          message: 'Gagal mengubah data Project',
          status: 'FAILED',
        });
      } else {
        NotificationAdmin({
          title: 'Project diubah',
          message: 'Berhasil mengubah data Project',
          status: 'SUCCESS',
        });
        queryClient.invalidateQueries({ queryKey: [GET_ALL_PROJECTS] });
        queryClient.invalidateQueries({ queryKey: [GET_DETAIL_PROJECT] });

        router.push(PROJECTS_ADMIN_PAGE);
      }
    },
    onError(error, variables, context) {
      NotificationAdmin({
        title: 'Project gagal diubah',
        message: 'Gagal mengubah data Project',
        status: 'FAILED',
      });
    },
  });

  return query;
};

export default useUpdateProject;
