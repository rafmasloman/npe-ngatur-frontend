'use client';

import { Box, Button, SimpleGrid, Stack, Text, Image } from '@mantine/core';
import CookieLibs from '../../../libs/cookie-next';
import {
  DASHBOARD_ADMIN_PAGE,
  LOGIN_PAGE,
} from '../../../constant/page_routes';
import { ICLaunch } from '../../../assets/icons/launch.icon';
import { AppDefault01, AppDefault02 } from '../../../assets/images';

const ContactSection = () => {
  const token = CookieLibs.getCookie('auth_token');
  return (
    <Box
      bg={'#14263F'}
      className="relative h-fit lg:h-[400px] overflow-hidden rounded-3xl"
    >
      <SimpleGrid cols={{ base: 1, md: 2 }}>
        <Stack className="p-10 lg:px-0 lg:py-14 lg:pl-16 ">
          <Stack gap={30} className="">
            <Text className="text-xl lg:text-5xl text-white font-medium">
              Mulai Project anda!
            </Text>
            <Text className="text-gray text-sm lg:text-lg font-normal lg:font-medium">
              Banyak keutungan yang didapat dengan meningkatkan struktur dan
              memudahkan anda dalam mengelola project dari client
            </Text>
          </Stack>

          <Button
            rightSection={<ICLaunch width={25} height={25} />}
            variant="outline"
            className="bg-white  text-blue-950  rounded-lg  font-medium w-fit h-[40px] lg:text-lg lg:h-[60px]"
            component="a"
            href={!token ? LOGIN_PAGE : DASHBOARD_ADMIN_PAGE}
          >
            Launch Project
          </Button>
        </Stack>

        <div className="flex">
          <Image
            src={AppDefault01.src}
            alt="Image"
            className="hidden lg:block absolute right-[300px] w-[250px] h-[500px] z-10 -bottom-48"
            height={500}
            width={250}
          />

          <Image
            src={AppDefault02.src}
            alt="Image"
            className="hidden lg:block w-[250px] h-[500px] absolute right-36 -top-48 "
            height={500}
            width={250}
          />
        </div>
      </SimpleGrid>
    </Box>
  );
};

export default ContactSection;
