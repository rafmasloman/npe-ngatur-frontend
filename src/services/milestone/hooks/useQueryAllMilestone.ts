import { useQuery } from '@tanstack/react-query';
import { GET_ALL_MILESTONES } from '../../../constant/query_key';
import milestoneServiceApi from '../MilestoneService';

export const useQueryAllMilestones = () => {
  return useQuery({
    queryKey: [GET_ALL_MILESTONES],
    queryFn: () => milestoneServiceApi.getAllMilestone(),
    select(data) {
      return data.data;
    },
  });
};
