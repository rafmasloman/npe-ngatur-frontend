'use client';

import {
  PropsWithChildren,
  Suspense,
  createContext,
  useEffect,
  useState,
} from 'react';
import TokenUtils from '../utils/token';
import { useQueryCredentials } from '../services/auth/hooks/useQueryCredential';
import { IAuthCredentialResponse } from '../services/auth/AuthInterface';
import { Box, Loader, Text } from '@mantine/core';

interface IUserContextProps {
  user: IAuthCredentialResponse | null;
}

export const AuthContext = createContext<IUserContextProps>({ user: null });

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<any>(null);
  const token = TokenUtils.getToken();

  const credential = useQueryCredentials({
    onSuccesCb(data) {
      setUser(data);
    },
    onErrorCb(error) {},
  });

  return (
    <AuthContext.Provider value={{ user: user }}>
      {children}
    </AuthContext.Provider>
  );
};
