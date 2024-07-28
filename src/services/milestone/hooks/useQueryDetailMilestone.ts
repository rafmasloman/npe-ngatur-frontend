import { useQuery } from '@tanstack/react-query';
import { GET_MILESTONE_DETAIL } from '../../../constant/query_key';
import milestoneServiceApi from '../MilestoneService';

const useQueryMilestoneDetail = (milestoneId: string) => {
  const query = useQuery({
    queryKey: [GET_MILESTONE_DETAIL, milestoneId],
    queryFn: () => milestoneServiceApi.getDetailMilestone(milestoneId),
    select(data) {
      return data.data;
    },
  });

  return query;
};

export default useQueryMilestoneDetail;
