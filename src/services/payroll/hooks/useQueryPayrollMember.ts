import { useQuery } from '@tanstack/react-query';
import { GET_PAYROLL_MEMBER } from '../../../constant/query_key';
import payrollService from '../PayrollService';

const useQueryPayrollMember = (payrollId?: string) => {
  const query = useQuery({
    queryKey: [GET_PAYROLL_MEMBER, payrollId],
    queryFn: () => payrollService.getPayrollMember(payrollId),
    select(data) {
      return data.data;
    },
  });

  return query;
};

export default useQueryPayrollMember;
