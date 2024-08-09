'use client';

import { AppShell, Burger, Container, Group } from '@mantine/core';
import { ReactNode } from 'react';
import HeaderLayout from './HeaderLayout';
import { useDisclosure } from '@mantine/hooks';
import AdminHeaderLayout from './AdminHeader';
import NavbarAdmin from './NavbarAdmin';

interface IAdminLayoutPropsType {
  children: ReactNode;
}

const AdminLayout = ({ children }: IAdminLayoutPropsType) => {
  const [opened, { toggle }] = useDisclosure();
  return (
    <AppShell
      header={{ height: 100 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      className=""
      classNames={{
        header: `border-0 flex gap-x-3 text-white px-3.5 md:px-0 bg-blue-950 items-center border-b border-b-neutral-200`,
        navbar: `border-0 py-12 pl-5 border-r border-r-neutral-200 `,
      }}
    >
      <AppShell.Header>
        <AdminHeaderLayout />
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
      </AppShell.Header>

      <AppShell.Navbar>
        <NavbarAdmin />
      </AppShell.Navbar>

      <AppShell.Main>
        <Container
          ff={'poppins'}
          className="bg-neutral-50 min-h-screen py-5 md:py-20"
          fluid
        >
          {children}
        </Container>
      </AppShell.Main>
    </AppShell>
  );
};

export default AdminLayout;
