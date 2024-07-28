import { useQuery } from '@tanstack/react-query';
import { GET_DETAIL_MEMBER } from '../../../constant/query_key';
import memberService from '../MemberService';

const useQueryMemberDetail = (memberId: string) => {
  const query = useQuery({
    queryKey: [GET_DETAIL_MEMBER, memberId],
    queryFn: () => memberService.getMemberDetail(memberId),
    select(data) {
      return data.data;
    },
  });

  return query;
};

export default useQueryMemberDetail;
