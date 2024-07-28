'use client';

import { useQuery } from '@tanstack/react-query';
import {
  GET_ALL_CLIENTS,
  GET_USER_CREDENTIALS,
} from '../../../constant/query_key';
import authService from '../AuthService';
import TokenUtils from '../../../utils/token';
import { useEffect } from 'react';

interface QueryProjectsOption {
  onSuccesCb: (data: any) => void;
  onErrorCb: (error: Error) => void;
}

export const useQueryCredentials = ({
  onSuccesCb,
  onErrorCb,
}: QueryProjectsOption) => {
  const token = TokenUtils.getToken();

  const query = useQuery({
    queryKey: [GET_USER_CREDENTIALS, token],
    queryFn: authService.userCredential,
    select(data) {
      return data;
    },
  });

  useEffect(() => {
    if (query.isError) {
      console.log('error : ', query.isError);

      onErrorCb(query.error);
    }
  }, [query.isError, query.error, onErrorCb]);

  useEffect(() => {
    if (query.isSuccess && query.data) {
      onSuccesCb(query.data.user);
    }
  }, [query.isSuccess, query.data, onSuccesCb]);

  return query;
};
