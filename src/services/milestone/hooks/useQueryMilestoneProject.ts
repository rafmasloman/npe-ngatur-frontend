import { useQuery } from '@tanstack/react-query';
import {
  GET_ALL_PROJECTS,
  GET_MILESTONE_PROJECTS,
} from '../../../constant/query_key';
import milestoneServiceApi from '../MilestoneService';

export const useGetMilestonesByProject = (projectId: string) => {
  return useQuery({
    queryKey: [GET_MILESTONE_PROJECTS, projectId],
    queryFn: () => milestoneServiceApi.getMilestonesByProject(projectId),
    select(data) {
      return data.data;
    },
  });
};
