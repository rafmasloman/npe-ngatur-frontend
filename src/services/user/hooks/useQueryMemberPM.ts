import { useQuery } from '@tanstack/react-query';
import { GET_MEMBER_PROJECT_MANAGER } from '../../../constant/query_key';
import userService from '../UserService';

const useQueryMemberPM = () => {
  const query = useQuery({
    queryKey: [GET_MEMBER_PROJECT_MANAGER],
    queryFn: () => userService.getMemberProjectManagerRole(),
    select(data) {
      return data.data;
    },
  });

  return query;
};

export default useQueryMemberPM;
