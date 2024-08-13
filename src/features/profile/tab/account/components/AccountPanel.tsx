import { Box, Divider, Group, Stack, Text } from '@mantine/core';
import AccountForm from './AccountForm';

const AccountPanel = () => {
  const handleUpdateAccount = (values: any) => {
    const updatePayload = {
      email: values.email,
      password: values.password,
    };
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
