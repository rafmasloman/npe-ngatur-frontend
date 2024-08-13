'use client';

import {
  Box,
  Container,
  Grid,
  Image,
  SimpleGrid,
  Space,
  Stack,
  Text,
} from '@mantine/core';
import NavbarHome from '../features/home/components/NavbarHome';
import BaseButton from '../components/Button/BaseButton';
import ContactSection from '../features/home/components/ContactSection';
import { ICSalary } from '../assets/icons/salary.icon';
import { ICTasks } from '../assets/icons/tasks.icon';
import { ICTeamColaboration } from '../assets/icons/team_collaboration.icon';
import { ICProjectManagement } from '../assets/icons/project_manajemen.icon';
import { COLORS } from '../constant/colors';
import { IconCircleArrowRight, IconPointerCode } from '@tabler/icons-react';
import ProductCard from '../features/home/components/ProductCard';
import FooterSection from '../features/home/components/FooterSection';
import { AbstractImage, ThumbnailImage } from '../assets/images';
// import bg from '../assets/images/contactus_bg.png'

export default function Home() {
  return (
    <>
      {/* <SEO title="Homepage" description="NPE Management Project Website" /> */}

      <main className="bg-custom_black">
        <NavbarHome />

        <Container
          bg={'white'}
          fluid
          className="px-0 pt-20 rounded-tr-[40px] rounded-tl-[40px]"
        >
          <Container className="px-5 lg:px-0 " size={'xl'} ff={'poppins'}>
            <Box className="">
              <div className="relative">
                <Text className="text-2xl lg:text-5xl font-semibold leading-loose lg:leading-loose text-center ">
                  Take full{' '}
                  <span
                    className="bg-blue-950 text-white px-3  rounded-2xl lg:text-[40px]"
                    style={{
                      transform: 'rotate(-5deg)',
                      display: 'inline-block',
                    }}
                  >
                    controll
                  </span>{' '}
                  of your {"teams's"} <br className="hidden lg:block" />{' '}
                  productivity and tasks
                </Text>

                <div className="w-fit hidden lg:block lg:absolute -bottom-2 -left-1 lg:bottom-10 lg:left-56">
                  <IconPointerCode
                    color="#F79F1A"
                    className="absolute -top-8 right-0 "
                    style={{
                      transform: 'rotate(90deg)',
                      display: 'inline-block',
                    }}
                  />
                  <Text className="px-3.5 py-1 bg-[#F79F1A] w-fit rounded-lg text-[10px] lg:text-xs">
                    Bayu Ajid
                  </Text>
                </div>

                <div className="w-fit hidden lg:block lg:absolute -bottom-5 right-0 lg:-bottom-2 lg:right-56">
                  <IconPointerCode
                    color="#3ABC6B"
                    className="absolute -top-8 left-0"
                  />
                  <Text className="px-3.5 py-1 bg-[#3ABC6B] w-fit rounded-lg text-[10px] lg:text-xs">
                    Rafly Masloman
                  </Text>
                </div>
              </div>

              <div className=" w-full ">
                <Text className="text-[#808080] mx-auto  mt-5 lg:mt-8 text-center tracking-tight lg:tracking-wider leading-relaxed text-xs lg:text-base lg:w-3/4">
                  Lorem ipsum dolor sit amet consectetur. Aliquam sit amet
                  sagittis lacinia. A elementum ullamcorper cras at. Condimentum
                  est ac pharetra fermentum turpis semper. Volutpat pretium erat
                  amet sed. Sapien dolor bibendum consectetur nulla odio risus
                  vitae risus. Sem sed porta mauris magna ac morbi et.
                </Text>
              </div>

              <Space mt={40} />

              <div className=" text-center">
                <BaseButton
                  variant="primary"
                  bg={COLORS.primary}
                  rightSection={<IconCircleArrowRight />}
                  className="font-medium w-[180px] h-[40px] text-base"
                >
                  Explore Now
                </BaseButton>
              </div>
            </Box>

            <Space mt={100} />

            <Box className="">
              <div className="flex justify-center">
                <Image
                  src={ThumbnailImage.src}
                  alt="Thumbnail Image"
                  className="w-full h-full lg:w-[1000px] lg:h-[700px]"
                  width={1500}
                  height={1500}
                />
              </div>
            </Box>

            <Space mt={100} />

            <Box>
              <SimpleGrid cols={{ base: 1, sm: 2 }}>
                <Stack className="mb-10 lg:mb-0" justify="center">
                  <Text className="text-primary text-xl font-semibold">
                    Feature
                  </Text>

                  <Text className="text-blue-950 text-xl lg:text-2xl font-semibold">
                    Tingkatkan Kolaborasi Tim kalian
                  </Text>

                  <Text className="text-[#808080] text-justify lg:text-left">
                    Membangun project anda dengan fitur-fitur yang memudahkan
                    pengelolaan project, pengelolaan tugas, mengelola alokasi
                    gaji yang transparan, dan kolaborasi antar anggota tim
                    project yang terintegrasi dengan baik.
                  </Text>
                </Stack>

                <Grid
                  justify="center"
                  classNames={{ root: `overflow-scroll md:overflow-hidden` }}
                >
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <ProductCard
                      name="Project Management"
                      description="Monitoring sejauh mana progress Project anda melalui Task, Milestone, Teams, dan fitur-fitur keren lainnya."
                      icon={<ICProjectManagement />}
                    />
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <ProductCard
                      name="Task Management"
                      description="Pengelolaan tugas anggota tim project, seperti update status tugas agar proses pengerjaan dapat diketahui"
                      icon={<ICTasks />}
                    />
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <ProductCard
                      name="Payment Salary"
                      description="Memudahkan pembagian gaji setiap anggota tim project, agar alokasi gaji dapat terstruktur dengan baik"
                      icon={<ICSalary />}
                    />
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <ProductCard
                      name="Team Collaboration"
                      description="Menfasilitasi komunikasi antar anggota tim untuk setiap task yang di dimiliki, sehingga meminimalisir kesalahan "
                      icon={<ICTeamColaboration />}
                    />
                  </Grid.Col>
                </Grid>
              </SimpleGrid>
            </Box>

            <Space mt={100} />

            <ContactSection />
          </Container>

          <Space mt={100} />

          <Container
            fluid
            className="p-0  lg:p-5  bg-[url('../assets/images/contactus_bg.png')] bg-cover"
          >
            <FooterSection />
          </Container>
        </Container>
        <Image
          src={AbstractImage.src}
          alt="Thumbnail Image"
          width={1000}
          height={1000}
          className="hidden lg:block lg:absolute lg:-bottom-[42%] xl:-bottom-2/3 -z-10 w-full h-full"
        />
      </main>
    </>
  );
}
