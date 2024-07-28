import { useQuery } from '@tanstack/react-query';
import {
  GET_DETAIL_MEMBER,
  GET_PROJECTS_USER,
} from '../../../constant/query_key';
import memberService from '../MemberService';

const useQueryMemberProject = (userId?: string) => {
  const query = useQuery({
    queryKey: [GET_PROJECTS_USER, userId],
    queryFn: () => memberService.getAllMemberProject(userId),
    select(data) {
      return data.data;
    },
  });

  return query;
};

export default useQueryMemberProject;
