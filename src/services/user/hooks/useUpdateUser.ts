import { useMutation, useQueryClient } from '@tanstack/react-query';
import userService from '../UserService';
import { USER_ADMIN_PAGE } from '../../../constant/page_routes';
import {
  GET_ALL_USERS,
  GET_DETAIL_USER,
  UPDATE_USER,
} from '../../../constant/query_key';
import { useRouter } from 'next/navigation';
import NotificationAdmin from '../../../features/common/components/NotificationAdmin';

const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const query = useMutation({
    mutationKey: [UPDATE_USER],
    mutationFn: userService.updatePutUserMutation,
    onSuccess(data, variables, context) {
      if (!data.data) {
        NotificationAdmin({
          title: 'User gagal diubah',
          message: 'Gagal mengubah data user',
          status: 'FAILED',
        });
      } else {
        NotificationAdmin({
          title: 'User diubah',
          message: 'Berhasil mengubah data user',
          status: 'SUCCESS',
        });
        queryClient.invalidateQueries({ queryKey: [GET_ALL_USERS] });
        queryClient.invalidateQueries({ queryKey: [GET_DETAIL_USER] });

        router.push(USER_ADMIN_PAGE);
      }
    },
    onError(error, variables, context) {
      NotificationAdmin({
        title: 'User gagal diubah',
        message: 'Gagal mengubah data user',
        status: 'FAILED',
      });
    },
  });

  return query;
};

export default useUpdateUser;
