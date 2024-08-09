import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PROJECT_DETAIL_PM_PAGE } from '../../../constant/page_routes';
import {
  CREATE_MILESTONES_ON_PROJECT,
  GET_MILESTONE_PROJECTS,
} from '../../../constant/query_key';
import { useParams, useRouter } from 'next/navigation';
import NotificationAdmin from '../../../features/common/components/NotificationAdmin';
import milestoneServiceApi from '../MilestoneService';

const useUpdateMilestone = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const params = useParams<{ project_id: string }>();

  const query = useMutation({
    mutationFn: milestoneServiceApi.updateMilestone,
    onSuccess(data, variables, context) {
      if (!data.data) {
        NotificationAdmin({
          title: 'Milestone gagal diubah',
          message: 'Gagal mengubah data Milestone',
          status: 'FAILED',
        });
      } else {
        NotificationAdmin({
          title: 'Milestone diubah',
          message: 'Berhasil mengubah data Milestone',
          status: 'SUCCESS',
        });
        queryClient.invalidateQueries({ queryKey: [GET_MILESTONE_PROJECTS] });

        router.push(`${PROJECT_DETAIL_PM_PAGE}/${params.project_id}`);
      }
    },
    onError(error, variables, context) {
      NotificationAdmin({
        title: 'Milestone gagal diubah',
        message: 'Gagal mengubah data Milestone',
        status: 'FAILED',
      });
    },
  });

  return query;
};

export default useUpdateMilestone;
