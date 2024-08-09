'use client';

import { AppShell, Container } from '@mantine/core';
import { ReactNode } from 'react';
import HeaderLayout from './HeaderLayout';

interface IWorkspaceLayoutPropsType {
  children: ReactNode;
}

const WorkspaceLayout = ({ children }: IWorkspaceLayoutPropsType) => {
  return (
    <AppShell
      header={{ height: 100 }}
      classNames={{
        main: `bg-custom_black h-screen`,
        header: `bg-custom_black border-0`,
      }}
    >
      <AppShell.Header>
        <HeaderLayout />
      </AppShell.Header>

      <AppShell.Main>
        <Container
          ff={'poppins'}
          className="bg-slate-50 min-h-screen rounded-tr-[36px] rounded-tl-[36px] px-3.5 py-5 md:p-10"
          fluid
        >
          {children}
        </Container>
      </AppShell.Main>
    </AppShell>
  );
};

export default WorkspaceLayout;
