import { useQuery } from '@tanstack/react-query';
import {
  GET_ALL_PROJECTS,
  GET_DETAIL_PROJECT,
} from '../../../constant/query_key';
import projectService from '../ProjectsService';
import { useEffect } from 'react';

interface QueryProjectsOption {
  projectId: string;
  onSuccesCb: (data: any) => void;
  onErrorCb: (error: Error) => void;
}

const useQueryDetailProject = ({
  projectId,
  onSuccesCb,
  onErrorCb,
}: QueryProjectsOption) => {
  const query = useQuery({
    queryKey: [GET_DETAIL_PROJECT, projectId],
    queryFn: () => projectService.getDetailProject(projectId),

    select(data) {
      return data;
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

export default useQueryDetailProject;
