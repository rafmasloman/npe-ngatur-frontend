import { useQuery } from '@tanstack/react-query';
import { GET_ALL_CLIENTS } from '../../../constant/query_key';
import userService from '../../user/UserService';
import clientService from '../ClientService';

export const useQueryAllClients = () => {
  const query = useQuery({
    queryKey: [GET_ALL_CLIENTS],
    queryFn: () => clientService.getAllClients(),
    select(data) {
      return data.data;
    },
  });

  return query;
};
