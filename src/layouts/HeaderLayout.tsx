'use client';

import { Group, Image, Menu, Stack, Text } from '@mantine/core';
import NavbarItems from '../components/Navbar/NavbarItems';
import { GoHomeFill } from 'react-icons/go';
import { BiExit, BiSolidDashboard, BiUserCircle } from 'react-icons/bi';
import { FaFolderOpen, FaPerson } from 'react-icons/fa6';
import { IoWallet } from 'react-icons/io5';
import NPELogoWhite from '../assets/images/npe_ngatur.png';
import UserNavigationMenu from '../components/Menu/UserNavigationMenu';
import {
  LOGIN_PAGE,
  PAYROLL_PM_PAGE,
  PAYROLL_STAFF_PAGE,
  PROFILE_PM_PAGE,
  PROFILE_STAFF_PAGE,
  PROJECT_DETAIL_PM_PAGE,
  PROJECT_PM_PAGE,
  PROJECT_STAFF_PAGE,
} from '../constant/page_routes';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { usePathname, useRouter } from 'next/navigation';
import TokenUtils from '../utils/token';
import useQueryMemberDetail from '../services/member/hooks/useQueryMemberDetail';
import useQueryUserDetail from '../services/user/hooks/useQueryUserDetail';
import useQueryUserProfile from '../services/profile/hooks/useQueryUserProfile';

const HeaderLayout = () => {
  const userContext = useContext(AuthContext);
  const member = useQueryUserProfile({
    userId: userContext.user?.id,
    onSuccesCb(data) {},
    onErrorCb(error) {},
  });

  const path = usePathname();
  const router = useRouter();

  const currentPath = path.split('/');

  const handleLogout = () => {
    const token = TokenUtils.removeToken();

    router.push(LOGIN_PAGE);
  };

  return (
    <Group
      className="h-full px-10 w-full container mx-auto"
      ff={'poppins'}
      justify="space-between"
    >
      <Group gap={10}>
        <Image
          src={NPELogoWhite.src}
          alt="img-placeholder"
          className="w-10 h-10 "
        />
        <Stack gap={0} ff={'poppins'}>
          <Text c={'white'}>NPE</Text>
          <Text c={'white'}>Ngatur</Text>
        </Stack>
      </Group>

      <NavbarItems
        pathname={currentPath[2]}
        items={[
          {
            text: 'Homepage',
            icon: <GoHomeFill className="text-lg" />,
            href: '/',
            pathname: 'homepage',
          },
          {
            text: 'Dashboard',
            icon: (
              <BiSolidDashboard
                className={`text-xl ${
                  currentPath[2]?.toLowerCase() === undefined
                    ? 'text-amber-400 text-xl'
                    : ''
                }`}
              />
            ),
            href:
              userContext.user?.role === 'STAFF'
                ? '/staff'
                : '/project-manager',
            pathname: undefined,
          },
          {
            text: 'Project',
            icon: (
              <FaFolderOpen
                className={`text-xl ${
                  currentPath[2]?.toLowerCase() === 'project'
                    ? 'text-amber-400'
                    : ''
                }`}
              />
            ),
            href:
              userContext.user?.role === 'STAFF'
                ? PROJECT_STAFF_PAGE
                : PROJECT_PM_PAGE,
            pathname: 'project',
          },
          {
            text: 'Payroll',
            icon: (
              <IoWallet
                className={`text-xl ${
                  currentPath[2]?.toLowerCase() === 'payroll'
                    ? 'text-amber-400'
                    : ''
                }`}
              />
            ),
            href:
              userContext.user?.role === 'STAFF'
                ? PAYROLL_STAFF_PAGE
                : PAYROLL_PM_PAGE,
            pathname: 'payroll',
          },
        ]}
      />

      <Menu
        withArrow
        width={200}
        classNames={{
          label: `text-base font-normal`,
        }}
      >
        <Menu.Target>
          <UserNavigationMenu
            profilePicture={`${member.data?.profilePicture}`}
            variant="primary"
            name={`${userContext.user?.firstname} ${userContext.user?.lastname}`}
            role={`${userContext.user?.role}`}
          />
        </Menu.Target>

        <Menu.Dropdown ff={'poppins'}>
          <Menu.Label>Menu</Menu.Label>
          <Menu.Item>
            <Group
              onClick={() =>
                router.push(
                  userContext.user?.role === 'STAFF'
                    ? PROFILE_STAFF_PAGE
                    : PROFILE_PM_PAGE,
                )
              }
            >
              <BiUserCircle className="text-xl" />
              <Text>Profile</Text>
            </Group>
          </Menu.Item>

          <Menu.Divider />

          <Menu.Item>
            <Group onClick={handleLogout}>
              <BiExit className="text-xl" />
              <Text>Logout</Text>
            </Group>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
};

export default HeaderLayout;
