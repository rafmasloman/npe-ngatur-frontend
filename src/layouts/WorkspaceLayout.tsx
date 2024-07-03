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
        main: `bg-custom_black`,
        header: `bg-custom_black border-0`,
      }}
    >
      <AppShell.Header>
        <HeaderLayout />
      </AppShell.Header>

      <AppShell.Main>
        <Container
          ff={'poppins'}
          className="bg-neutral-50 min-h-screen rounded-tr-[36px] rounded-tl-[36px] py-10 px-2 md:p-10"
          fluid
        >
          {children}
        </Container>
      </AppShell.Main>
    </AppShell>
  );
};

export default WorkspaceLayout;
