import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PROJECT_DETAIL_PM_PAGE } from '../../../constant/page_routes';
import {
  CREATE_MILESTONES_ON_PROJECT,
  GET_MILESTONE_PROJECTS,
} from '../../../constant/query_key';
import { useRouter } from 'next/navigation';
import NotificationAdmin from '../../../features/common/components/NotificationAdmin';
import milestoneServiceApi from '../MilestoneService';

const useCreateMilestone = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const query = useMutation({
    mutationKey: [CREATE_MILESTONES_ON_PROJECT],
    mutationFn: milestoneServiceApi.createMilestone,
    onSuccess(data, variables, context) {
      if (!data.data) {
        NotificationAdmin({
          title: 'Milestone gagal ditambah',
          message: 'Gagal menambah data Milestone',
          status: 'FAILED',
        });
      } else {
        NotificationAdmin({
          title: 'Milestone ditambah',
          message: 'Berhasil menambah data Milestone',
          status: 'SUCCESS',
        });
        queryClient.invalidateQueries({ queryKey: [GET_MILESTONE_PROJECTS] });

        router.push(PROJECT_DETAIL_PM_PAGE);
      }
    },
    onError(error, variables, context) {
      NotificationAdmin({
        title: 'Milestone gagal ditambah',
        message: 'Gagal menambah data Milestone',
        status: 'FAILED',
      });
    },
  });

  return query;
};

export default useCreateMilestone;
