import { Group, Image, Menu, Stack, Text } from '@mantine/core';
import { BiExit, BiSolidDashboard, BiUserCircle } from 'react-icons/bi';

import NPELogoWhite from '../assets/images/npe_ngatur.png';
import UserNavigationMenu from '../components/Menu/UserNavigationMenu';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import TokenUtils from '../utils/token';
import { useRouter } from 'next/navigation';
import { LOGIN_PAGE } from '../constant/page_routes';

const AdminHeaderLayout = () => {
  const admin = useContext(AuthContext);

  const router = useRouter();

  const handleLogout = () => {
    const token = TokenUtils.removeToken();

    router.push(LOGIN_PAGE);
  };

  return (
    <Group
      className="h-fit md:h-full  md:px-10 md:w-full container mx-auto "
      ff={'poppins'}
      justify="space-between"
    >
      <Group>
        <Image
          src={NPELogoWhite.src}
          alt="img-placeholder"
          className="w-10 h-10 "
        />
        <Stack gap={0} ff={'poppins'}>
          <Text className=" font-semibold">NPE</Text>
          <Text className=" font-semibold">Ngatur</Text>
        </Stack>
      </Group>

      <Group visibleFrom="md">
        <Menu
          withArrow
          width={200}
          classNames={{
            label: `text-base font-normal`,
          }}
        >
          <Menu.Target>
            <UserNavigationMenu
              variant="primary"
              name={`${admin.user?.firstname} ${admin.user?.lastname}`}
              role={`${admin.user?.role}`}
            />
          </Menu.Target>

          <Menu.Dropdown ff={'poppins'}>
            <Menu.Label>Menu</Menu.Label>
            {/* <Menu.Item>
              <Group>
                <BiUserCircle className="text-xl" />
                <Text>Profile</Text>
              </Group>
            </Menu.Item> */}

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
    </Group>
  );
};

export default AdminHeaderLayout;
