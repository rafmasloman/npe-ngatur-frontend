'use client';

import { ReactNode } from 'react';
import AdminLayout from '../../layouts/AdminLayout';

interface IAdminMainLayoutPropsType {
  children: ReactNode;
}

const AdminMainLayout = ({ children }: IAdminMainLayoutPropsType) => {
  return <AdminLayout>{children}</AdminLayout>;
};

export default AdminMainLayout;
