'use client';

import {
  Divider,
  SimpleGrid,
  Text,
  Stack,
  Container,
  Group,
  Flex,
  Image,
} from '@mantine/core';
import { IconMap } from '@tabler/icons-react';
import Link from 'next/link';
import { COLORS } from '../../../constant/colors';
import { footerData } from '../helper/footer.helper';
import ICWhatsapp from '../../../assets/icons/Whatsapp.icon';
import ICInstagram from '../../../assets/icons/Instagram.icon';
import ICLinkedin from '../../../assets/icons/Linkedin.icon';
import { NPENgaturLogo } from '../../../assets/images';

const FooterSection = () => {
  return (
    <Container size={'xl'} py={30} ff={'poppins'}>
      <SimpleGrid cols={{ base: 1, lg: 2 }} spacing={100}>
        <Text className="text-white text-lg  lg:text-xl w-full ">
          Perusahaan software house yang membantu anda membuat website, aplikasi
          dan kebutuhan lainnya secara digital dengan tim profesional yang
          berpengalaman.
        </Text>

        <Stack>
          <Text className="text-white">HQ - Makassar, Sulawesi Selatan</Text>
          <Flex align={'center'} justify={'space-between'} gap={20}>
            <IconMap color="white" />
            <Text className="text-white font-light w-fit">
              BTP Blok E No.159, Tamalanrea, Kec. Tamalanrea, Kota Makassar,
              Sulawesi Selatan 90245
            </Text>
          </Flex>
        </Stack>
      </SimpleGrid>

      <Divider my={40} color={COLORS.gray} />

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing={'xl'}>
        {footerData.map((data: any) => {
          return (
            <div key={data.title}>
              <Text className="text-white font-medium text-lg">
                {data.title}
              </Text>
              <Stack mt={20} gap={30}>
                {data.textList.map((listData: any) => {
                  return (
                    <Link
                      href={listData.href}
                      key={listData.name}
                      className="text-gray"
                    >
                      {listData.name}
                    </Link>
                  );
                })}
              </Stack>
            </div>
          );
        })}
      </SimpleGrid>

      <Divider my={40} color={COLORS.gray} />

      <Group justify="space-between">
        <Group gap={'xl'}>
          <Link href={''}>
            <ICWhatsapp color="white" />
          </Link>
          <Link href={''}>
            <ICInstagram color="white" />
          </Link>
          <Link href={''}>
            <ICLinkedin />
          </Link>
        </Group>

        <Image
          src={NPENgaturLogo.src}
          alt="NPE Logo"
          className="w-[32px] h-fit"
          width={30}
          height={'fit-content'}
        />
      </Group>
    </Container>
  );
};

export default FooterSection;
