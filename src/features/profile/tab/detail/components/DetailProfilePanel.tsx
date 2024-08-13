import {
  Avatar,
  Box,
  Divider,
  Group,
  SimpleGrid,
  Space,
  Stack,
  Text,
} from '@mantine/core';
import { getUserPosition } from '../helpers/profile-detail.helper';
import moment from 'moment';

interface IProfileDataProps {
  firstname?: string;
  lastname?: string;
  email?: string;
  phoneNumber?: string;
  birthDate?: string;
  role?: string;
  profilePicture?: string;
}

const DetailProfilePanel = ({
  firstname,
  lastname,
  birthDate,
  email,
  phoneNumber,
  profilePicture,
  role,
}: IProfileDataProps) => {
  return (
    <Box className="container mx-auto">
      <Group justify="space-between">
        <Text className="font-semibold text-lg md:text-xl">
          Your Detail Profile
        </Text>
      </Group>

      <Divider className="my-7" />

      <Group>
        <Group>
          <Avatar
            size={'xl'}
            src={`${process.env.NEXT_PUBLIC_API_DOWNLOAD_FILES_URL}/members/${profilePicture}`}
            className="border-2 border-neutral-400"
          />
          <Stack gap={5}>
            <Text className="text-base md:text-lg lg:text-xl font-semibold">
              {`${firstname} ${lastname}`}
            </Text>
            <Text className="text-base text-neutral-400">{role}</Text>
          </Stack>
        </Group>
      </Group>

      <Divider className="my-7" />

      <Stack gap={40}>
        <Text className="font-semibold text-base md:text-lg">
          Personal Information
        </Text>

        <SimpleGrid
          cols={{ base: 1, sm: 2 }}
          spacing={{ base: 20, sm: 30, md: 40 }}
        >
          <Stack gap={5}>
            <Text className="text-base text-slate-400 font-medium">
              First Name
            </Text>
            <Text className="text-lg">{firstname}</Text>
          </Stack>

          <Stack gap={5}>
            <Text className="text-base text-slate-400 font-medium">
              Last Name
            </Text>
            <Text className="text-lg">{lastname}</Text>
          </Stack>

          <Stack gap={5}>
            <Text className="text-base text-slate-400 font-medium">Email</Text>
            <Text className="text-lg">{email}</Text>
          </Stack>

          <Stack gap={5}>
            <Text className="text-base text-slate-400 font-medium">
              Tanggal Lahir
            </Text>
            <Text className="text-lg">
              {moment(birthDate).format('DD MMMM YYYY')}
            </Text>
          </Stack>

          <Stack gap={5}>
            <Text className="text-base text-slate-400 font-medium">
              Nomor Telepon
            </Text>
            <Text className="text-lg">{phoneNumber}</Text>
          </Stack>
        </SimpleGrid>
      </Stack>

      <Stack>{/* {milestonesProject.data} */}</Stack>
    </Box>
  );
};

export default DetailProfilePanel;
