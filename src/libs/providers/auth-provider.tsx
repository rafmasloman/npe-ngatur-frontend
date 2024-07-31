'use client';

import { PropsWithChildren } from 'react';
import { AuthProvider } from '../../context/AuthContext';

const AuthProviders = ({ children }: PropsWithChildren) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default AuthProviders;
