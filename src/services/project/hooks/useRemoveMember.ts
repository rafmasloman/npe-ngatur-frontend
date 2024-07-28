import { useMutation, useQueryClient } from '@tanstack/react-query';

import { PROJECTS_ADMIN_PAGE } from '../../../constant/page_routes';
import {
  DELETE_PROJECT,
  GET_ALL_PROJECTS,
  REMOVE_MEMBER_FROM_PROJECT,
} from '../../../constant/query_key';
import { useRouter } from 'next/navigation';
import NotificationAdmin from '../../../features/common/components/NotificationAdmin';
import projectService from '../ProjectsService';

const useRemoveMember = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationKey: [REMOVE_MEMBER_FROM_PROJECT],
    mutationFn: projectService.deleteMemberFromProject,
    onSuccess(data, variables, context) {
      if (!data.data) {
        NotificationAdmin({
          title: 'Member gagal terhapus',
          message: 'Gagal menghapus Member',
          status: 'FAILED',
        });
      } else {
        NotificationAdmin({
          title: 'Member terhapus',
          message: 'Berhasil menghapus Member',
          status: 'SUCCESS',
        });
        // queryClient.invalidateQueries({ queryKey: [GET_ALL_PROJECTS] });

        // router.push(PROJECTS_ADMIN_PAGE);
      }
    },
    onError(error, variables, context) {
      NotificationAdmin({
        title: 'Member gagal terhapus',
        message: 'Gagal menghapus data Member',
        status: 'FAILED',
      });
    },
  });

  return mutation;
};

export default useRemoveMember;
