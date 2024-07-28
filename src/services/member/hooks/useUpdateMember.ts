import { useMutation, useQueryClient } from '@tanstack/react-query';
import { USER_ADMIN_PAGE } from '../../../constant/page_routes';
import {
  GET_ALL_MEMBERS,
  GET_DETAIL_MEMBER,
  UPDATE_MEMBER,
} from '../../../constant/query_key';
import { useRouter } from 'next/navigation';
import NotificationAdmin from '../../../features/common/components/NotificationAdmin';
import memberService from '../MemberService';

const useUpdateMember = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const query = useMutation({
    mutationKey: [UPDATE_MEMBER],
    mutationFn: memberService.updateMember,
    onSuccess(data, variables, context) {
      if (!data.data) {
        NotificationAdmin({
          title: 'Member gagal diubah',
          message: 'Gagal mengubah data member',
          status: 'FAILED',
        });
      } else {
        NotificationAdmin({
          title: 'Member diubah',
          message: 'Berhasil mengubah data member',
          status: 'SUCCESS',
        });
        queryClient.invalidateQueries({ queryKey: [GET_ALL_MEMBERS] });
        queryClient.invalidateQueries({ queryKey: [GET_DETAIL_MEMBER] });

        router.push(USER_ADMIN_PAGE);
      }
    },
    onError(error, variables, context) {
      NotificationAdmin({
        title: 'Member gagal diubah',
        message: 'Gagal mengubah data member',
        status: 'FAILED',
      });
    },
  });

  return query;
};

export default useUpdateMember;
