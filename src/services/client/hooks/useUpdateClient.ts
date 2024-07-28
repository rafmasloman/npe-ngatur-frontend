import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  CLIENT_ADMIN_PAGE,
  USER_ADMIN_PAGE,
} from '../../../constant/page_routes';
import {
  GET_ALL_CLIENTS,
  GET_ALL_MEMBERS,
  GET_DETAIL_CLIENT,
  GET_DETAIL_MEMBER,
  UPDATE_CLIENT,
  UPDATE_MEMBER,
} from '../../../constant/query_key';
import { useRouter } from 'next/navigation';
import NotificationAdmin from '../../../features/common/components/NotificationAdmin';
import clientService from '../ClientService';

const useUpdateClient = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const query = useMutation({
    mutationKey: [UPDATE_CLIENT],
    mutationFn: clientService.updateClient,
    onSuccess(data, variables, context) {
      if (!data.data) {
        NotificationAdmin({
          title: 'Client gagal diubah',
          message: 'Gagal mengubah data Client',
          status: 'FAILED',
        });
      } else {
        NotificationAdmin({
          title: 'Client diubah',
          message: 'Berhasil mengubah data Client',
          status: 'SUCCESS',
        });
        queryClient.invalidateQueries({ queryKey: [GET_ALL_CLIENTS] });
        queryClient.invalidateQueries({ queryKey: [GET_DETAIL_CLIENT] });

        router.push(CLIENT_ADMIN_PAGE);
      }
    },
    onError(error, variables, context) {
      NotificationAdmin({
        title: 'Client gagal diubah',
        message: 'Gagal mengubah data Client',
        status: 'FAILED',
      });
    },
  });

  return query;
};

export default useUpdateClient;
