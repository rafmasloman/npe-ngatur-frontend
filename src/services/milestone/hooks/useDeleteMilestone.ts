import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  DELETE_MILESTONE,
  GET_ALL_MILESTONES_BY_PROJECTS,
  GET_DETAIL_PROJECT,
  GET_MILESTONE_PROJECTS,
} from '../../../constant/query_key';
import NotificationAdmin from '../../../features/common/components/NotificationAdmin';
import milestoneServiceApi from '../MilestoneService';

const useDeleteMilestone = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: [DELETE_MILESTONE],
    mutationFn: milestoneServiceApi.deleteMilestone,
    onSuccess(data, variables, context) {
      if (!data) {
        NotificationAdmin({
          title: 'Milestone gagal terhapus',
          message: 'Gagal menghapus data Milestone',
          status: 'FAILED',
        });
      } else {
        NotificationAdmin({
          title: 'Milestone terhapus',
          message: 'Berhasil menghapus data Milestone',
          status: 'SUCCESS',
        });
      }
      queryClient.invalidateQueries({
        queryKey: [GET_MILESTONE_PROJECTS],
      });
    },
    onError(error, variables, context) {
      NotificationAdmin({
        title: 'Milestone gagal terhapus',
        message: 'Gagal menghapus data milestone',
        status: 'FAILED',
      });
    },
  });

  return mutation;
};

export default useDeleteMilestone;
