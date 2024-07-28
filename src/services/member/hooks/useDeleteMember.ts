import { useMutation, useQueryClient } from '@tanstack/react-query';

import { MEMBER_ADMIN_PAGE } from '../../../constant/page_routes';
import { DELETE_MEMBER, GET_ALL_MEMBERS } from '../../../constant/query_key';
import { useRouter } from 'next/navigation';
import NotificationAdmin from '../../../features/common/components/NotificationAdmin';
import memberService from '../MemberService';

const useDeleteMember = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationKey: [DELETE_MEMBER],
    mutationFn: memberService.deleteMember,
    onSuccess(data, variables, context) {
      if (!data.data) {
        NotificationAdmin({
          title: 'Member gagal terhapus',
          message: 'Gagal menghapus data member',
          status: 'FAILED',
        });
      } else {
        NotificationAdmin({
          title: 'Member terhapus',
          message: 'Berhasil menghapus data member',
          status: 'SUCCESS',
        });
        queryClient.invalidateQueries({ queryKey: [GET_ALL_MEMBERS] });

        router.push(MEMBER_ADMIN_PAGE);
      }
    },
    onError(error, variables, context) {
      NotificationAdmin({
        title: 'Member gagal terhapus',
        message: 'Gagal menghapus data member',
        status: 'FAILED',
      });
    },
  });

  return mutation;
};

export default useDeleteMember;
