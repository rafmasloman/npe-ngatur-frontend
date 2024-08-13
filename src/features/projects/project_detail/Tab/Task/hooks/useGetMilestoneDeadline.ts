import { useQuery } from '@tanstack/react-query';
import milestoneServiceApi from '../../../../../../services/milestone/MilestoneService';

export const useGetMilestonesDeadline = (milestoneId?: string) => {
  const query = useQuery({
    queryKey: ['get-milestone-deadline-id-key', milestoneId],
    queryFn: () => milestoneServiceApi.getMilestoneDeadline(milestoneId),
    select(data) {
      return data.data.endDate;
    },
    enabled: !!milestoneId,
  });

  return query;
};
