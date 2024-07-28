import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  PAYROLL_PM_PAGE,
  PROJECT_DETAIL_PM_PAGE,
} from '../../../constant/page_routes';
import { CREATE_PAYROLL } from '../../../constant/query_key';
import { useRouter } from 'next/navigation';
import NotificationAdmin from '../../../features/common/components/NotificationAdmin';
import payrollService from '../PayrollService';

const useCreatePayroll = () => {
  const router = useRouter();

  const query = useMutation({
    mutationKey: [CREATE_PAYROLL],
    mutationFn: payrollService.createPayroll,
    onSuccess(data, variables, context) {
      if (!data.data) {
        NotificationAdmin({
          title: 'Payroll gagal ditambah',
          message: 'Gagal menambah data Payroll',
          status: 'FAILED',
        });
      } else {
        NotificationAdmin({
          title: 'Payroll ditambah',
          message: 'Berhasil menambah data Payroll',
          status: 'SUCCESS',
        });

        router.push(PAYROLL_PM_PAGE);
      }
    },
    onError(error, variables, context) {
      NotificationAdmin({
        title: 'Payroll gagal ditambah',
        message: 'Gagal menambah data Payroll',
        status: 'FAILED',
      });
    },
  });

  return query;
};

export default useCreatePayroll;
