'use client';

import { ReactNode } from 'react';
import WorkspaceLayout from '../../layouts/WorkspaceLayout';

interface IProjectManagerLayoutPropsType {
  children: ReactNode;
}

const ProjectManagerLayout = ({ children }: IProjectManagerLayoutPropsType) => {
  return <WorkspaceLayout>{children}</WorkspaceLayout>;
};

export default ProjectManagerLayout;
