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
import WorkspaceLayout from '../../layouts/WorkspaceLayout';

interface IProjectManagerLayoutPropsType {
  children: ReactNode;
}

const ProjectManagerLayout = ({ children }: IProjectManagerLayoutPropsType) => {
  return <WorkspaceLayout>{children}</WorkspaceLayout>;
};

export default ProjectManagerLayout;
