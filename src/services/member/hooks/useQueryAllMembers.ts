import { useQuery } from '@tanstack/react-query';
import { GET_ALL_MEMBERS } from '../../../constant/query_key';
import userService from '../../user/UserService';
import memberService from '../MemberService';

export const useQueryAllMembers = () => {
  const query = useQuery({
    queryKey: [GET_ALL_MEMBERS],
    queryFn: () => memberService.getAllMembers(),
    select(data) {
      return data.data;
    },
  });

  return query;
};
