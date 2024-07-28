/* eslint-disable react/display-name */
import { Avatar, Group, Stack, Text, UnstyledButton } from '@mantine/core';
import { forwardRef } from 'react';

interface IUserNavigationButtonPropsType
  extends React.ComponentPropsWithoutRef<'button'> {
  name: string;
  role: string;
  variant?: 'primary' | 'secondary';
}

const UserNavigationMenu = forwardRef<
  HTMLButtonElement,
  IUserNavigationButtonPropsType
>(({ name, role, variant, ...props }, ref) => {
  return (
    <UnstyledButton ref={ref} {...props} visibleFrom="md">
      <Group>
        <Avatar radius={'xl'} />

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
