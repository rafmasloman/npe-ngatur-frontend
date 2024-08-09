'use client';

import {
  Text,
  Container,
  Group,
  SimpleGrid,
  Image,
  Stack,
  Box,
  Avatar,
} from '@mantine/core';
import { NPENgaturLogo, NPENgaturWhiteLogo } from '../../../assets/images';
import LoginForm from '../../../features/auth/components/LoginForm';
import { useAuth } from '../../../context/hooks/useAuth';

const Login = () => {
  const { login, isSuccess } = useAuth();
  const handleLoginSubmit = (values: { email: string; password: string }) => {
    const payload = {
      email: values.email,
      password: values.password,
    };

    login(payload);
  };

  return (
    <div
      style={{
        height: '100vh',
        fontFamily: 'poppins',
        // background: `linear-gradient(to right top, rgba(0, 32, 96, 1), rgba(0, 48, 115, 1))`,
        backgroundColor: 'white', // Gradient dari kiri bawah ke kanan atas,
      }}
      className="overflow-hidden"
    >
      <Group className="absolute left-10 top-10 ">
        <Avatar
          src={NPENgaturLogo.src}
          size={50}
          className="h-fit"
          alt="Logo"
        />
        <Text fw={600} fz={'1.25rem'} className="text-custom_black">
          NPE Ngatur
        </Text>
      </Group>

      <SimpleGrid cols={{ base: 1, md: 2 }} className="h-screen">
        <div className=" flex flex-col justify-center">
          <Box
            maw={400}
            bg={'white'}
            mx={'auto'}
            className="md:bg-white w-full bg-transparent p-5 lg:p-10 rounded-none md:rounded-3xl md:border md:border-solid border-neutral-400 md:shadow-sm"
          >
            <LoginForm isLoading={isSuccess} onSubmit={handleLoginSubmit} />
          </Box>
        </div>

        <div className="bg-primary rounded-tl-[60px] rounded-bl-[60px]  hidden lg:flex justify-center items-center relative">
          <Image
            src={NPENgaturWhiteLogo.src}
            className="opacity-10 absolute w-[500px]"
            alt="NPE Logo"
          />

          <Stack align="center" gap={30}>
            <Image
              src={NPENgaturWhiteLogo.src}
              className="w-[120px]"
              alt="Logo"
            />
            <Text className="text-5xl text-white font-semibold" c={'white'}>
              NPE Ngatur
            </Text>
          </Stack>
        </div>
      </SimpleGrid>
    </div>
  );
};

export default Login;
