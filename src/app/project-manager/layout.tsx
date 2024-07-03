'use client';

import {
  AppShell,
  Container,
  Group,
  Image,
  Menu,
  Stack,
  Text,
} from '@mantine/core';
import { ReactNode } from 'react';
import NPELogoWhite from '../../assets/images/npe_ngatur.png';
import { IoWallet } from 'react-icons/io5';
import { GoHomeFill } from 'react-icons/go';
import { BiSolidDashboard } from 'react-icons/bi';
import { FaFolderOpen, FaPerson } from 'react-icons/fa6';

import NavbarItems from '../../components/Navbar/NavbarItems';
import UserNavigationMenu from '../../components/Menu/UserNavigationMenu';
import HeaderLayout from '../../layouts/HeaderLayout';
import SEO from '../../components/SEO/BaseSEO';

interface IProjectManagerLayoutPropsType {
  children: ReactNode;
}

const ProjectManagerLayout = ({ children }: IProjectManagerLayoutPropsType) => {
  return (
    <AppShell
      header={{ height: 100 }}
      classNames={{
        main: `bg-custom_black `,
        header: `bg-custom_black border-0`,
      }}
    >
      <AppShell.Header>
        <HeaderLayout />
      </AppShell.Header>

      <AppShell.Main>
        <Container
          ff={'poppins'}
          className="bg-neutral-50 rounded-tr-[36px] rounded-tl-[36px] py-10 px-2 md:p-10"
          fluid
        >
          {children}
        </Container>
      </AppShell.Main>
    </AppShell>
  );
};

export default ProjectManagerLayout;
