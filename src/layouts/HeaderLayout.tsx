import { Group, Image, Menu, Stack, Text } from '@mantine/core';
import NavbarItems from '../components/Navbar/NavbarItems';
import { GoHomeFill } from 'react-icons/go';
import { BiSolidDashboard } from 'react-icons/bi';
import { FaFolderOpen, FaPerson } from 'react-icons/fa6';
import { IoWallet } from 'react-icons/io5';
import NPELogoWhite from '../assets/images/npe_ngatur.png';
import UserNavigationMenu from '../components/Menu/UserNavigationMenu';

const HeaderLayout = () => {
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
        items={[
          {
            text: 'Homepage',
            icon: <GoHomeFill className="text-lg" />,
            href: '/',
          },
          {
            text: 'Dashboard',
            icon: <BiSolidDashboard className="text-lg" />,
            href: '/dashboard',
          },
          {
            text: 'Projects',
            icon: <FaFolderOpen className="text-lg" />,
            href: '/project',
          },
          {
            text: 'Payroll',
            icon: <IoWallet className="text-lg" />,
            href: '/payroll',
          },
        ]}
      />

      <Menu withArrow width={200}>
        <Menu.Target>
          <UserNavigationMenu name="Muh Ikhsan" role="Project Manager" />
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Account</Menu.Label>
          <Menu.Item>
            <FaPerson />
            <Text>Profile</Text>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
};

export default HeaderLayout;
