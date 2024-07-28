import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  CLIENT_ADMIN_PAGE,
  HOMEPAGE,
  MEMBER_ADMIN_PAGE,
  USER_ADMIN_PAGE,
} from '../../../constant/page_routes';
import {
  CREATE_CLIENT,
  CREATE_MEMBER,
  GET_ALL_CLIENTS,
  GET_ALL_MEMBERS,
  GET_USER_CREDENTIALS,
  LOGIN_AUTH,
} from '../../../constant/query_key';
import { useRouter } from 'next/navigation';
import NotificationAdmin from '../../../features/common/components/NotificationAdmin';
import authService from '../AuthService';
import TokenUtils from '../../../utils/token';

const useLoginMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationKey: [LOGIN_AUTH],
    mutationFn: authService.login,
    onSuccess(data, variables, context) {
      if (!data.data) {
        NotificationAdmin({
          title: 'Login Gagal',
          message: 'Username atau password salah ',
          status: 'FAILED',
        });
      } else {
        NotificationAdmin({
          title: 'Login Berhasil',
          message: 'Berhasil login, mengarahkan ke halaman berikutnya',
          status: 'SUCCESS',
        });

        queryClient.invalidateQueries({ queryKey: [GET_USER_CREDENTIALS] });

        TokenUtils.setToken(data.data.token);

        const token = TokenUtils.getToken();

        if (token) {
          router.push(HOMEPAGE);
        }
      }
    },
    onError(error, variables, context) {
      NotificationAdmin({
        title: 'Login gagal',
        message: 'Login tidak berhasil',
        status: 'FAILED',
      });
    },
  });

  return mutation;
};

export default useLoginMutation;
