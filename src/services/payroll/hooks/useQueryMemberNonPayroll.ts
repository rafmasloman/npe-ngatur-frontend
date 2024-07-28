import { useQuery } from '@tanstack/react-query';
import { GET_MEMBER_NON_PAYROLL } from '../../../constant/query_key';
import payrollService from '../PayrollService';

const useQueryMemberNonPayroll = (projectId?: string) => {
  const query = useQuery({
    queryKey: [GET_MEMBER_NON_PAYROLL, projectId],
    queryFn: () => payrollService.getMemberNonPayroll(projectId),
    select(data) {
      return data.data;
    },
  });

  return query;
};

export default useQueryMemberNonPayroll;
