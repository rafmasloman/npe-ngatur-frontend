import { useMutation, useQueryClient } from '@tanstack/react-query';
import userService from '../UserService';
import { USER_ADMIN_PAGE } from '../../../constant/page_routes';
import { DELETE_USER, GET_ALL_USERS } from '../../../constant/query_key';
import { useRouter } from 'next/navigation';
import NotificationAdmin from '../../../features/common/components/NotificationAdmin';

const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationKey: [DELETE_USER],
    mutationFn: userService.deleteUserMutation,
    onSuccess(data, variables, context) {
      if (!data) {
        NotificationAdmin({
          title: 'User gagal terhapus',
          message: 'Gagal menghapus data user',
          status: 'FAILED',
        });
      } else {
        NotificationAdmin({
          title: 'User terhapus',
          message: 'Berhasil menghapus data user',
          status: 'SUCCESS',
        });
        queryClient.invalidateQueries({ queryKey: [GET_ALL_USERS] });

        router.push(USER_ADMIN_PAGE);
      }
    },
    onError(error, variables, context) {
      console.log('error : ', error);

      NotificationAdmin({
        title: 'User gagal terhapus',
        message: 'Gagal menghapus data user',
        status: 'FAILED',
      });
    },
  });

  return mutation;
};

export default useDeleteUser;
