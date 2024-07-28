import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  MEMBER_ADMIN_PAGE,
  USER_ADMIN_PAGE,
} from '../../../constant/page_routes';
import { CREATE_MEMBER, GET_ALL_MEMBERS } from '../../../constant/query_key';
import { useRouter } from 'next/navigation';
import NotificationAdmin from '../../../features/common/components/NotificationAdmin';
import memberService from '../MemberService';

const useCreateMember = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const query = useMutation({
    mutationKey: [CREATE_MEMBER],
    mutationFn: memberService.createMember,
    onSuccess(data, variables, context) {
      if (!data.data) {
        NotificationAdmin({
          title: 'Member gagal ditambah',
          message: 'Gagal menambah data member',
          status: 'FAILED',
        });
      } else {
        NotificationAdmin({
          title: 'Member ditambah',
          message: 'Berhasil menambah data member',
          status: 'SUCCESS',
        });
        queryClient.invalidateQueries({ queryKey: [GET_ALL_MEMBERS] });

        router.push(MEMBER_ADMIN_PAGE);
      }
    },
    onError(error, variables, context) {
      NotificationAdmin({
        title: 'Member gagal ditambah',
        message: 'Gagal menambah data member',
        status: 'FAILED',
      });
    },
  });

  return query;
};

export default useCreateMember;
