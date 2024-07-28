import { useQuery } from '@tanstack/react-query';
import { GET_ALL_USERS, GET_DETAIL_USER } from '../../../constant/query_key';
import userService from '../UserService';

const useQueryUserDetail = (userId: string) => {
  const query = useQuery({
    queryKey: [GET_DETAIL_USER, userId],
    queryFn: () => userService.getUserQueryById(userId),
    select(data) {
      return data.data;
    },
  });

  return query;
};

export default useQueryUserDetail;
