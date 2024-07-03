import { Button, Container, Group, Image, Stack, Text } from '@mantine/core';
import { NPENgaturLogo } from '../../../assets/images';
import ICDashboardButton from '../../../assets/icons/nav-icon/dashboard_btn.icon';
import { COLORS } from '../../../constant/colors';
import { useEffect, useState } from 'react';
import CookieLibs from '../../../libs/cookie-next';

const NavbarHome = () => {
  const [isTokenAvaiable, setIsTokenAvaiable] = useState(false);
  const token = CookieLibs.getCookie('auth_token');

  useEffect(() => {
    if (!!token) {
      setIsTokenAvaiable(!isTokenAvaiable);
    }
  }, [token, isTokenAvaiable]);

  return (
    <Container fluid px={50} pt={20} ff={'poppins'}>
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
            <Text className="font-bold text-blue-950 text-2xl">NPE</Text>
            <Text className="font-bold text-blue-950 text-2xl">
              <span className="text-primary">Nga</span>Tur
            </Text>
          </div>
        </Group>

        {/* <NavbarMainList /> */}
        <Group>
          <Button
            component={'a'}
            href={!!isTokenAvaiable ? '/dashboard' : '/login'}
            bg={COLORS.primary}
            className="font-medium text-base"
            rightSection={<ICDashboardButton width={20} height={20} />}
          >
            Go to Dashboard
          </Button>
        </Group>
      </Group>
    </Container>
  );
};

export default NavbarHome;
