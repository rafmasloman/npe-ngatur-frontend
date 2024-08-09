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

  // useEffect(() => {
  //   const getToken = TokenUtils.getToken();
  //   console.log('token : ', getToken);

  //   if (getToken) {
  //     if (credential.data) {
  //       setUser(credential.data);
  //     }
  //   }
  // }, [credential.data]);

  if (credential.isFetching && !credential.data) {
    return (
      // <Suspense
      //   fallback={
      //     <Box className=" min-h-screen max-w-screen flex justify-center items-center">
      //       <Loader color="blue" size={50} type="bars" />
      //     </Box>
      //   }
      // >
      <Box className=" min-h-screen max-w-screen flex justify-center items-center">
        <Loader color="blue" size={50} type="bars" />
      </Box>
      // </Suspense>
    );
  }

  return (
    <AuthContext.Provider value={{ user: user }}>
      {children}
    </AuthContext.Provider>
  );
};
