import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  GET_DETAIL_PROJECT,
  GET_DETAIL_TASK,
  GET_MILESTONE_PROJECTS,
  UPDATE_STATUS_TASK,
} from '../../../constant/query_key';
import taskService from '../TaskService';

const useUpdateTaskStatus = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: [UPDATE_STATUS_TASK],
    mutationFn: taskService.updateStatusTask,
    onSuccess(data, variables, context) {
      // if (!data.data) {
      //   console.log('error : ', data);
      // } else {
      //   console.log('data : ', data);

      // }
      queryClient.invalidateQueries({ queryKey: [GET_DETAIL_PROJECT] });
      queryClient.invalidateQueries({ queryKey: [GET_MILESTONE_PROJECTS] });
      queryClient.invalidateQueries({ queryKey: [GET_DETAIL_TASK] });
    },
    onError(error, variables, context) {},
  });

  return mutation;
};

export default useUpdateTaskStatus;
