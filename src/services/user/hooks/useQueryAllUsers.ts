import { useQuery } from '@tanstack/react-query';
import { GET_ALL_USERS } from '../../../constant/query_key';
import userService from '../UserService';

const useQueryAllUsers = () => {
  const query = useQuery({
    queryKey: [GET_ALL_USERS],
    queryFn: () => userService.getAllUsersQuery(),
    select(data) {
      return data.data;
    },
  });

  return query;
};

export default useQueryAllUsers;
