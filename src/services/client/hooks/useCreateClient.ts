import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  CLIENT_ADMIN_PAGE,
  MEMBER_ADMIN_PAGE,
  USER_ADMIN_PAGE,
} from '../../../constant/page_routes';
import {
  CREATE_CLIENT,
  CREATE_MEMBER,
  GET_ALL_CLIENTS,
  GET_ALL_MEMBERS,
} from '../../../constant/query_key';
import { useRouter } from 'next/navigation';
import NotificationAdmin from '../../../features/common/components/NotificationAdmin';
import clientService from '../ClientService';

const useCreateClient = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const query = useMutation({
    mutationKey: [CREATE_CLIENT],
    mutationFn: clientService.createClient,
    onSuccess(data, variables, context) {
      if (!data.data) {
        NotificationAdmin({
          title: 'Client gagal ditambah',
          message: 'Gagal menambah data Client',
          status: 'FAILED',
        });
      } else {
        NotificationAdmin({
          title: 'Client ditambah',
          message: 'Berhasil menambah data Client',
          status: 'SUCCESS',
        });
        queryClient.invalidateQueries({ queryKey: [GET_ALL_CLIENTS] });

        router.push(CLIENT_ADMIN_PAGE);
      }
    },
    onError(error, variables, context) {
      NotificationAdmin({
        title: 'Client gagal ditambah',
        message: 'Gagal menambah data Client',
        status: 'FAILED',
      });
    },
  });

  return query;
};

export default useCreateClient;
