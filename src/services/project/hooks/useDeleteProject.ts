import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PROJECTS_ADMIN_PAGE } from '../../../constant/page_routes';
import { DELETE_PROJECT, GET_ALL_PROJECTS } from '../../../constant/query_key';
import { useRouter } from 'next/navigation';
import NotificationAdmin from '../../../features/common/components/NotificationAdmin';
import projectService from '../ProjectsService';

const useDeleteProject = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationKey: [DELETE_PROJECT],
    mutationFn: projectService.deleteProject,
    onSuccess(data, variables, context) {
      if (!data.data) {
        NotificationAdmin({
          title: 'Project gagal terhapus',
          message: 'Gagal menghapus data Project',
          status: 'FAILED',
        });
      } else {
        NotificationAdmin({
          title: 'Project terhapus',
          message: 'Berhasil menghapus data Project',
          status: 'SUCCESS',
        });
        queryClient.invalidateQueries({ queryKey: [GET_ALL_PROJECTS] });

        router.push(PROJECTS_ADMIN_PAGE);
      }
    },
    onError(error, variables, context) {
      NotificationAdmin({
        title: 'Project gagal terhapus',
        message: 'Gagal menghapus data Project',
        status: 'FAILED',
      });
    },
  });

  return mutation;
};

export default useDeleteProject;
