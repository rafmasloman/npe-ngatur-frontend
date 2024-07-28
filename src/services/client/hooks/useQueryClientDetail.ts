import { useQuery } from '@tanstack/react-query';
import { GET_DETAIL_CLIENT } from '../../../constant/query_key';
import clientService from '../ClientService';

const useQueryClientDetail = (clientId: string) => {
  const query = useQuery({
    queryKey: [GET_DETAIL_CLIENT, clientId],
    queryFn: () => clientService.getClientDetail(clientId),
    select(data) {
      return data.data;
    },
  });

  return query;
};

export default useQueryClientDetail;
