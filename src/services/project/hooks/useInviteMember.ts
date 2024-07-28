import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  GET_DETAIL_PROJECT,
  INVITE_MEMBER_TO_PROJECT,
} from '../../../constant/query_key';
import NotificationAdmin from '../../../features/common/components/NotificationAdmin';
import projectService from '../ProjectsService';

const useInviteMember = () => {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationKey: [INVITE_MEMBER_TO_PROJECT],
    mutationFn: projectService.inviteMemberToProject,
    onSuccess(data, variables, context) {
      if (!data.data) {
        NotificationAdmin({
          title: 'Member gagal diundang',
          message: 'Gagal mengundang member',
          status: 'FAILED',
        });
      } else {
        NotificationAdmin({
          title: 'Member berhasil diundang',
          message: 'Berhasil mengundang data member',
          status: 'SUCCESS',
        });
        queryClient.invalidateQueries({ queryKey: [GET_DETAIL_PROJECT] });
      }
    },
    onError(error, variables, context) {
      NotificationAdmin({
        title: 'Member gagal diundang',
        message: 'Gagal mengundang member',
        status: 'FAILED',
      });
    },
  });

  return query;
};

export default useInviteMember;
