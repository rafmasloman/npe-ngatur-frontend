import { useQuery } from '@tanstack/react-query';
import { GET_ALL_PROJECTS } from '../../../constant/query_key';
import projectService from '../ProjectsService';
import { useEffect } from 'react';

interface QueryProjectsOption {
  onSuccesCb: (data: any) => void;
  onErrorCb: (error: Error) => void;
  projectName?: string
}

const useQueryProjects = ({ onSuccesCb, onErrorCb, projectName }: QueryProjectsOption) => {
  const query = useQuery({
    queryKey: [GET_ALL_PROJECTS],
    queryFn: () => {
      return projectService.getAllProjects();
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

export default useQueryProjects;
