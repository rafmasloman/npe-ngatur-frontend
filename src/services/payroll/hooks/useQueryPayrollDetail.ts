import { useQuery } from '@tanstack/react-query';
import { GET_DETAIL_PAYROLL } from '../../../constant/query_key';
import payrollService from '../PayrollService';

const useQueryPayrollDetail = (payrollId?: string) => {
  const query = useQuery({
    queryKey: [GET_DETAIL_PAYROLL, payrollId],
    queryFn: () => payrollService.getPayrollDetail(payrollId),
    select(data) {
      return data.data;
    },
  });

  return query;
};

export default useQueryPayrollDetail;
