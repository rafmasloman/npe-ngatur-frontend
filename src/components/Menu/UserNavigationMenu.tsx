/* eslint-disable react/display-name */
import { Avatar, Group, Stack, Text, UnstyledButton } from '@mantine/core';
import { forwardRef } from 'react';

interface IUserNavigationButtonPropsType
  extends React.ComponentPropsWithoutRef<'button'> {
  name: string;
  role: string;
}

const UserNavigationMenu = forwardRef<
  HTMLButtonElement,
  IUserNavigationButtonPropsType
>(({ name, role, ...props }, ref) => {
  return (
    <UnstyledButton ref={ref} {...props}>
      <Group>
        <Avatar radius={'xl'} />

        <Stack gap={0} ff={'poppins'}>
          <Text className="text-white text-base">{name}</Text>
          <Text className="text-neutral-400 text-sm">{role}</Text>
        </Stack>
      </Group>
    </UnstyledButton>
  );
});

export default UserNavigationMenu;
