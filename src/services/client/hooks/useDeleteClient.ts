import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  CLIENT_ADMIN_PAGE,
  MEMBER_ADMIN_PAGE,
} from '../../../constant/page_routes';
import {
  DELETE_CLIENT,
  DELETE_MEMBER,
  GET_ALL_CLIENTS,
  GET_ALL_MEMBERS,
} from '../../../constant/query_key';
import { useRouter } from 'next/navigation';
import NotificationAdmin from '../../../features/common/components/NotificationAdmin';
import clientService from '../ClientService';

const useDeleteClient = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationKey: [DELETE_CLIENT],
    mutationFn: clientService.deleteClient,
    onSuccess(data, variables, context) {
      if (!data) {
        NotificationAdmin({
          title: 'Client gagal terhapus',
          message: 'Gagal menghapus data Client',
          status: 'FAILED',
        });
      } else {
        NotificationAdmin({
          title: 'Client terhapus',
          message: 'Berhasil menghapus data Client',
          status: 'SUCCESS',
        });
        queryClient.invalidateQueries({ queryKey: [GET_ALL_CLIENTS] });
      }
    },
    onError(error, variables, context) {
      NotificationAdmin({
        title: 'Client gagal terhapus',
        message: 'Gagal menghapus data Client',
        status: 'FAILED',
      });
    },
  });

  return mutation;
};

export default useDeleteClient;
