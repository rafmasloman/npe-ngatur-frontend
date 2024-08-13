import { useQuery } from '@tanstack/react-query';
import { GET_USER_NON_MEMBER } from '../../../constant/query_key';
import userService from '../../../services/user/UserService';
import { Label } from 'recharts';

export const useGetUserNonMember = () => {
  const query = useQuery({
    queryKey: [GET_USER_NON_MEMBER],
    queryFn: () => userService.getUserNonMember(),
    select(data) {
      const setOptions = data.data.map((user) => {
        return {
          value: user.id,
          label: `${user.firstname} ${user.lastname}`,
        };
      });

      return setOptions;
    },
  });

  return query;
};
