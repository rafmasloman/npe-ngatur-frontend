import { useQuery } from '@tanstack/react-query';
import { GET_PROJECT_MEMBER_PAYROLL } from '../../../constant/query_key';
import projectService from '../ProjectsService';
import { useEffect } from 'react';

interface QueryProjectsOption {
  projectId: string;
  onSuccesCb: (data: any) => void;
  onErrorCb: (error: Error) => void;
}

const useQueryProjectMemberPayroll = ({
  projectId,
  onSuccesCb,
  onErrorCb,
}: QueryProjectsOption) => {
  const query = useQuery({
    queryKey: [GET_PROJECT_MEMBER_PAYROLL, projectId],
    queryFn: () => projectService.getProjectMemberPayroll(projectId),

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
  }, [onSuccesCb, query.data, query.isSuccess]);

  return query;
};

export default useQueryProjectMemberPayroll;
