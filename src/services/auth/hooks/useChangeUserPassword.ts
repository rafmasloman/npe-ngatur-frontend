import { useMutation, useQueryClient } from '@tanstack/react-query';
import { HOMEPAGE } from '../../../constant/page_routes';
import {
  GET_ALL_USERS,
  GET_USER_CREDENTIALS,
  LOGIN_AUTH,
} from '../../../constant/query_key';
import { useRouter } from 'next/navigation';
import NotificationAdmin from '../../../features/common/components/NotificationAdmin';
import authService from '../AuthService';
import TokenUtils from '../../../utils/token';

const useChangeUserPassword = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: authService.changeUserPassword,
    onSuccess(data, variables, context) {
      if (!data.data) {
        NotificationAdmin({
          title: 'Gagal Mengubah Password User',
          message: 'Username atau password salah ',
          status: 'FAILED',
        });
      } else {
        NotificationAdmin({
          title: 'Berhasil',
          message: 'Berhasil Mengubah Password User',
          status: 'SUCCESS',
        });

        queryClient.invalidateQueries({ queryKey: [GET_ALL_USERS] });
      }
    },
    onError(error, variables, context) {
      NotificationAdmin({
        title: 'Gagal mengubah password user',
        message: 'Masalah tidak diketahui',
        status: 'FAILED',
      });
    },
  });

  return mutation;
};

export default useChangeUserPassword;
