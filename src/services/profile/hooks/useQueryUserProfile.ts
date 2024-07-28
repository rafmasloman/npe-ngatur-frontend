import { useQuery } from '@tanstack/react-query';
import { GET_USER_PROFILE } from '../../../constant/query_key';
import { useEffect } from 'react';
import profileService from '../ProfileService';

interface QueryProjectsOption {
  userId?: string;
  onSuccesCb: (data: any) => void;
  onErrorCb: (error: Error) => void;
}

const useQueryUserProfile = ({
  userId,
  onSuccesCb,
  onErrorCb,
}: QueryProjectsOption) => {
  const query = useQuery({
    queryKey: [GET_USER_PROFILE, userId],
    queryFn: () => profileService.getUserProfile(userId),

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

export default useQueryUserProfile;
