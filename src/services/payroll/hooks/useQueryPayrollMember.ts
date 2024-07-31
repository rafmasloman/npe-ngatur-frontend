import { useQuery } from '@tanstack/react-query';
import { GET_PAYROLL_MEMBER } from '../../../constant/query_key';
import payrollService from '../PayrollService';

const useQueryPayrollMember = (userId?: string) => {
  const query = useQuery({
    queryKey: [GET_PAYROLL_MEMBER, userId],
    queryFn: () => payrollService.getPayrollMember(userId),
    select(data) {
      return data.data;
    },
  });

  return query;
};

export default useQueryPayrollMember;
