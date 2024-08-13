'use client';

import { Button, Container, Group, Image, Stack, Text } from '@mantine/core';
import { NPENgaturLogo } from '../../../assets/images';
import ICDashboardButton from '../../../assets/icons/nav-icon/dashboard_btn.icon';
import { COLORS } from '../../../constant/colors';
import { useContext, useState } from 'react';
import CookieLibs from '../../../libs/cookie-next';
import BaseButton from '../../../components/Button/BaseButton';
import { TOKEN_NAME } from '../../../constant/token.constant';
import { useRouter } from 'next/navigation';
import {
  DASHBOAR_PM_PAGE,
  DASHBOAR_STAFF_PAGE,
  DASHBOARD_ADMIN_PAGE,
  HOMEPAGE,
  LOGIN_PAGE,
  PROJECT_PM_PAGE,
} from '../../../constant/page_routes';
import { AuthContext } from '../../../context/AuthContext';

const NavbarHome = () => {
  const [isTokenAvaiable, setIsTokenAvaiable] = useState(false);
  const token = CookieLibs.getCookie(TOKEN_NAME);
  const router = useRouter();

  const userRole = useContext(AuthContext);

  // useEffect(() => {
  //   if (!!token) {
  //     setIsTokenAvaiable(!isTokenAvaiable);
  //   }
  // }, [token, isTokenAvaiable]);

  return (
    <Container fluid px={50} py={20} ff={'poppins'} className="bg-custom_black">
      <Group justify="space-between">
        <Group gap={10}>
          <Image
            src={NPENgaturLogo.src}
            width={56}
            height={56}
            className="w-10 h-10"
            alt="NPE Management Project Logo"
          />

          <div>
            <Text className="font-bold text-white text-2xl">NPE</Text>
            <Text className="font-bold text-white text-2xl">
              <span className="text-white">Nga</span>Tur
            </Text>
          </div>
        </Group>

        {/* <NavbarMainList /> */}
        <Group>
          <BaseButton
            type="button"
            variant="primary"
            bg={COLORS.primary}
            className="font-medium text-base"
            onClick={() =>
              router.push(
                !userRole.user
                  ? LOGIN_PAGE
                  : userRole.user?.role === 'ADMIN'
                  ? DASHBOARD_ADMIN_PAGE
                  : userRole.user?.role === 'PROJECT_MANAGER'
                  ? DASHBOAR_PM_PAGE
                  : DASHBOAR_STAFF_PAGE,
              )
            }
            rightSection={<ICDashboardButton width={20} height={20} />}
          >
            Go to Dashboard
          </BaseButton>
        </Group>
      </Group>
    </Container>
  );
};

export default NavbarHome;
