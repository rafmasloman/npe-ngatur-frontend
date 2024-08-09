import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  PAYROLL_ADMIN_PAGE,
  PAYROLL_PM_PAGE,
  PROJECT_DETAIL_PM_PAGE,
} from '../../../constant/page_routes';
import {
  CREATE_PAYROLL,
  GET_ALL_PAYROLLS,
  GET_PAYROLL_MEMBER,
  GET_PROJECT_MEMBER_PAYROLL,
  UPDATE_PAYROLL,
} from '../../../constant/query_key';
import { useRouter } from 'next/navigation';
import NotificationAdmin from '../../../features/common/components/NotificationAdmin';
import payrollService from '../PayrollService';

const useUpdatePayroll = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationKey: [UPDATE_PAYROLL],
    mutationFn: payrollService.updatePayroll,
    onSuccess(data, variables, context) {
      if (!data.data) {
        console.log('data : ', data.data);

        NotificationAdmin({
          title: 'Payroll gagal diubah',
          message: 'Gagal mengubah data Payroll',
          status: 'FAILED',
        });
      } else {
        NotificationAdmin({
          title: 'Payroll diubah',
          message: 'Berhasil mengubah data Payroll',
          status: 'SUCCESS',
        });

        queryClient.invalidateQueries({
          queryKey: [GET_PROJECT_MEMBER_PAYROLL],
        });
      }
    },
    onError(error, variables, context) {
      NotificationAdmin({
        title: 'Payroll gagal diubah',
        message: 'Gagal mengubah data Payroll',
        status: 'FAILED',
      });
    },
  });

  return query;
};

export default useUpdatePayroll;
