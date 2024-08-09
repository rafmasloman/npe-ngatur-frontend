'use client';

import { Group, Paper, Space, Text } from '@mantine/core';
import ClientForm, {
  IClientValuesParams,
} from '../../../../features/client/components/ClientForm';
import useCreateClient from '../../../../services/client/hooks/useCreateClient';
import { ICClient } from '../../../../assets/icons/nav-icon/client.icon';
import FormAdminLayout from '../../../../layouts/FormLayout';

const ClientManagement = () => {
  const createClient = useCreateClient();

  const handleSubmitForm = (values: IClientValuesParams) => {
    const createPayload = {
      name: values.name,
      phoneNumber: values.phoneNumber,
      address: values.address,
      email: values.email,
    };

    createClient.mutate(createPayload);
  };

  return (
    <FormAdminLayout
      title="Tambah Client"
      icon={<ICClient width={25} height={25} />}
    >
      <ClientForm
        isLoading={createClient.isSuccess}
        onSubmit={handleSubmitForm}
      />
    </FormAdminLayout>
  );
};

export default ClientManagement;
