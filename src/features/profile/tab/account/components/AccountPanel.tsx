'use client';

import { Box, Divider, Group, Stack, Text } from '@mantine/core';
import AccountForm from './AccountForm';
import useUpdateUserAccount from '../../../../../services/auth/hooks/useUpdateUserAccount';
import { useContext } from 'react';
import { AuthContext } from '../../../../../context/AuthContext';

const AccountPanel = () => {
  const user = useContext(AuthContext);

  const updateUserAccount = useUpdateUserAccount();

  const handleUpdateAccount = (values: any) => {
    const updatePayload = {
      email: values.email,
      newPassword: values.password,
    };

    if (user.user?.id) {
      updateUserAccount.mutate({
        userId: user.user?.id,
        payload: { ...updatePayload },
      });
    }
  };

  return (
    <Box className="container mx-auto">
      <Group justify="space-between">
        <Text className="font-semibold text-lg md:text-xl">
          Account Settings
        </Text>
      </Group>

      <Divider className="my-7" />

      <Stack gap={40}>
        <Text className="font-semibold text-base md:text-lg">
          Account Information
        </Text>

        <AccountForm
          onSubmit={handleUpdateAccount}
          initialValues={{ email: '', password: '' }}
        />
      </Stack>
    </Box>
  );
};

export default AccountPanel;
