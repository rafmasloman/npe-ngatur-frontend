import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  DELETE_PAYROLL,
  GET_PROJECT_MEMBER_PAYROLL,
} from '../../../constant/query_key';
import { useRouter } from 'next/navigation';
import NotificationAdmin from '../../../features/common/components/NotificationAdmin';
import payrollService from '../PayrollService';

const useDeletePayroll = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: [DELETE_PAYROLL],
    mutationFn: payrollService.deletePayroll,
    onSuccess(data, variables, context) {
      if (!data.data) {
        NotificationAdmin({
          title: 'Payroll gagal terhapus',
          message: 'Gagal menghapus data Payroll',
          status: 'FAILED',
        });
      } else {
        NotificationAdmin({
          title: 'Payroll terhapus',
          message: 'Berhasil menghapus data Payroll',
          status: 'SUCCESS',
        });
        queryClient.invalidateQueries({
          queryKey: [GET_PROJECT_MEMBER_PAYROLL],
        });
      }
    },
    onError(error, variables, context) {
      NotificationAdmin({
        title: 'Payroll gagal terhapus',
        message: 'Gagal menghapus data Payroll',
        status: 'FAILED',
      });
    },
  });

  return mutation;
};

export default useDeletePayroll;
