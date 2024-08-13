'use client';

import { Stack, Tabs, Text } from '@mantine/core';
import ProfileTab from '../../../features/profile/components/ProfileTab';
import DetailProfilePanel from '../../../features/profile/tab/detail/components/DetailProfilePanel';
import useQueryUserProfile from '../../../services/profile/hooks/useQueryUserProfile';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import EditProfilePanel from '../../../features/profile/tab/edit/components/EditProfilePanel';
import AccountPanel from '../../../features/profile/tab/account/components/AccountPanel';

const ProfileStaffPage = () => {
  const user = useContext(AuthContext);

  const userProfile = useQueryUserProfile({
    userId: user.user?.id,
    onSuccesCb(data) {},
    onErrorCb(error) {},
  });

  console.log('user profile : ', userProfile.data);

  if (!userProfile.data && userProfile.isLoading) {
    return <Text>Loading Profile Data .....</Text>;
  }

  return (
    <Stack className="container mx-auto" gap={50}>
      <Text className="text-base sm:text-lg md:text-2xl font-semibold ">
        Account Profile
      </Text>
      <ProfileTab>
        <Tabs.Panel value="profile">
          <DetailProfilePanel
            birthDate={userProfile.data.birthDate}
            email={userProfile.data.user.email}
            firstname={userProfile.data.user.firstname}
            lastname={userProfile.data.user.lastname}
            phoneNumber={userProfile.data.phoneNumber}
            role={userProfile.data.position}
            profilePicture={userProfile.data.profilePicture}
          />
        </Tabs.Panel>

        <Tabs.Panel value="edit-profile">
          <EditProfilePanel
            profileData={{
              firstname: userProfile.data.user.firstname,
              lastname: userProfile.data.user.lastname,
              ...userProfile.data,
            }}
          />
        </Tabs.Panel>

        <Tabs.Panel value="account">
          <AccountPanel />
        </Tabs.Panel>
      </ProfileTab>
    </Stack>
  );
};

export default ProfileStaffPage;
