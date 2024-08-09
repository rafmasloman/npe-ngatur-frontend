/* eslint-disable react/display-name */
import { Avatar, Group, Stack, Text, UnstyledButton } from '@mantine/core';
import { forwardRef } from 'react';

interface IUserNavigationButtonPropsType
  extends React.ComponentPropsWithoutRef<'button'> {
  name: string;
  role: string;
  profilePicture?: string;
  variant?: 'primary' | 'secondary';
}

const UserNavigationMenu = forwardRef<
  HTMLButtonElement,
  IUserNavigationButtonPropsType
>(({ name, role, profilePicture, variant, ...props }, ref) => {
  console.log('profile picture : ', profilePicture);

  return (
    <UnstyledButton ref={ref} {...props} visibleFrom="md">
      <Group>
        <Avatar
          radius={'xl'}
          src={
            !profilePicture
              ? null
              : `${process.env.NEXT_PUBLIC_API_DOWNLOAD_FILES_URL}/members/${profilePicture}`
          }
          size={40}
          className=" border-2 border-neutral-600 border-dashed"
        />

        <Stack gap={0} ff={'poppins'}>
          <Text
            className={`${
              variant === 'primary' ? 'text-white' : 'text-custom_black'
            } text-base`}
          >
            {name}
          </Text>
          <Text
            className={`${
              variant === 'primary' ? 'text-white' : 'text-neutral-400 '
            } text-sm`}
          >
            {role}
          </Text>
        </Stack>
      </Group>
    </UnstyledButton>
  );
});

export default UserNavigationMenu;
