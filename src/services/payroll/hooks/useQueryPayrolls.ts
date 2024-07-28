import { useQuery } from '@tanstack/react-query';
import { GET_ALL_PAYROLLS } from '../../../constant/query_key';
import { useEffect } from 'react';
import payrollService from '../PayrollService';

interface QueryPayrollsOption {
  onSuccesCb: (data: any) => void;
  onErrorCb: (error: Error) => void;
}

const useQueryPayrolls = ({ onSuccesCb, onErrorCb }: QueryPayrollsOption) => {
  const query = useQuery({
    queryKey: [GET_ALL_PAYROLLS],
    queryFn: () => {
      return payrollService.getAllPayroll();
    },
    select(data) {
      return data.data;
    },
  });

  useEffect(() => {
    if (query.isError) {
      onErrorCb(query.error);
    }
  }, [query.isError, query.error, onErrorCb]);

  useEffect(() => {
    if (query.isSuccess && query.data) {
      onSuccesCb(query.data);
    }
  }, [query.isSuccess, query.data, onSuccesCb]);

  return query;
};

export default useQueryPayrolls;
