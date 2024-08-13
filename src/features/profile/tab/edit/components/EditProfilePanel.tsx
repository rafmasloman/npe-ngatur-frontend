import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Divider,
  FileButton,
  Group,
  Stack,
  Text,
} from '@mantine/core';
import ProfileForm, { IProfileDetailValue } from './ProfileForm';
import { useEffect, useState } from 'react';
import { TbImageInPicture } from 'react-icons/tb';
import useUpdateProfile from '../../../../../services/profile/hooks/useUpdateProfile';
import { IoImages } from 'react-icons/io5';
import BaseButton from '../../../../../components/Button/BaseButton';
import { BsSave, BsTrash } from 'react-icons/bs';
import useUpdateProfilePicture from '../../../../../services/profile/hooks/useUpdateProfilePicture';

export interface IEditProfilePanelProps {
  profileData?: IProfileDetailValue;
}
const EditProfilePanel = ({ profileData }: IEditProfilePanelProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [imgProfilURL, setImgProfilURL] = useState<string | null>(null);
  const [isActiveBtnPicture, setIsActiveBtnPicture] = useState(false);

  const mutation = useUpdateProfile();
  const changeProfile = useUpdateProfilePicture();

  const handleUpdateProfile = (values: any) => {
    const payload = {
      firstname: values.firstname,
      lastname: values.lastname,
      phoneNumber: values.phoneNumber,
      birthDate: values.birthDate,
    };

    if (!!profileData?.userId) {
      mutation.mutate({ userId: profileData?.userId, payload });
    }
  };

  const handleUpdateProfilePicture = () => {
    const formData = new FormData();

    if (file) {
      formData.set('profilePicture', file);
      if (!!profileData?.userId) {
        changeProfile.mutate({
          userId: profileData?.userId,
          payload: formData,
        });
      }
    }
  };

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          setImgProfilURL(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  }, [file]);

  return (
    <Box className="container mx-auto">
      <Group justify="space-between">
        <Text className="font-semibold text-lg md:text-xl">
          Edit Your Profile
        </Text>
      </Group>

      <Divider className="my-7" />

      <Group className="w-full" justify="space-between">
        <Group gap={30}>
          <FileButton onChange={setFile}>
            {(props) => (
              <Stack className="relative" {...props}>
                {!profileData?.profilePicture && !file ? (
                  <Avatar
                    size={'xl'}
                    src={!imgProfilURL ? '' : imgProfilURL}
                    classNames={{
                      root: `border-2 border-solid border-neutral-300`,
                    }}
                  />
                ) : (
                  <Avatar
                    size={'xl'}
                    src={
                      !imgProfilURL
                        ? `${process.env.NEXT_PUBLIC_API_DOWNLOAD_FILES_URL}/members/${profileData?.profilePicture}`
                        : imgProfilURL
                    }
                    classNames={{
                      root: `border-4 border-solid border-neutral-300`,
                    }}
                  />
                )}

                <ActionIcon
                  radius={'md'}
                  autoContrast
                  className="absolute bottom-0 -right-2"
                  gradient={{ from: 'orange', to: 'grape', deg: 90 }}
                  variant="gradient"
                >
                  <IoImages className="text-white" />
                </ActionIcon>
              </Stack>
            )}
          </FileButton>
          <Stack gap={5}>
            <Text className="text-base md:text-lg lg:text-xl font-semibold">
              {`${profileData?.firstname} ${profileData?.lastname}`}
            </Text>
            <Text className="text-base text-neutral-400">
              {profileData?.position}
            </Text>
          </Stack>
        </Group>

        <Stack>
          <BaseButton
            variant="primary"
            disabled={!imgProfilURL}
            onClick={handleUpdateProfilePicture}
            // data-disabled
            loading={changeProfile.isPending}
            className="data-[disabled]:bg-neutral-200 data-[disabled]:text-neutral-300 data-[disabled]:cursor-not-allowed"
            leftSection={<BsSave className="text-lg" />}
          >
            Simpan Foto Profil
          </BaseButton>
          <BaseButton
            variant="secondary"
            onClick={handleUpdateProfilePicture}
            // data-disabled
            className="data-[disabled]:bg-neutral-200 data-[disabled]:text-neutral-300 data-[disabled]:cursor-not-allowed"
            leftSection={<BsTrash className="text-lg" />}
          >
            Hapus Foto
          </BaseButton>
        </Stack>
      </Group>

      <Divider className="my-7" />

      <Stack gap={40}>
        <Text className="font-semibold text-base md:text-lg">
          Personal Information
        </Text>

        <ProfileForm
          initialValues={{
            firstname: profileData?.firstname,
            lastname: profileData?.lastname,
            gender: profileData?.gender,
            birthDate: profileData?.birthDate,
            phoneNumber: profileData?.phoneNumber,
            position: profileData?.position,
            profilePicture: profileData?.profilePicture,
          }}
          onSubmit={handleUpdateProfile}
        />
      </Stack>
    </Box>
  );
};

export default EditProfilePanel;
