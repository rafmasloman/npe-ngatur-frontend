'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GET_ALL_USERS } from '../../../constant/query_key';
import { useRouter } from 'next/navigation';
import NotificationAdmin from '../../../features/common/components/NotificationAdmin';
import authService from '../AuthService';

const useUpdateUserAccount = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: authService.updateUserAccount,
    onSuccess(data, variables, context) {
      console.log('datass : ', data);

      if (!data) {
        NotificationAdmin({
          title: 'Gagal mengubah user account',
          message: 'Email atau password salah ',
          status: 'FAILED',
        });
      } else {
        NotificationAdmin({
          title: 'Berhasil',
          message: 'Berhasil mengubah user account',
          status: 'SUCCESS',
        });

        queryClient.invalidateQueries({ queryKey: [GET_ALL_USERS] });
      }
    },
    onError(error, variables, context) {
      NotificationAdmin({
        title: 'Gagal mengubah user account',
        message: 'Masalah tidak diketahui',
        status: 'FAILED',
      });
    },
  });

  return mutation;
};

export default useUpdateUserAccount;
