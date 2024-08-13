'use client';

import { ReactNode } from 'react';
import WorkspaceLayout from '../../layouts/WorkspaceLayout';

interface IStaffLayoutPropsType {
  children: ReactNode;
}

const StaffLayout = ({ children }: IStaffLayoutPropsType) => {
  return <WorkspaceLayout>{children}</WorkspaceLayout>;
};

export default StaffLayout;
