'use client';

import { useParams } from 'next/navigation';
import useUpdateClient from '../../../../../services/client/hooks/useUpdateClient';
import ClientForm, {
  IClientValuesParams,
} from '../../../../../features/client/components/ClientForm';
import useQueryClientDetail from '../../../../../services/client/hooks/useQueryClientDetail';
import { Text } from '@mantine/core';
import FormAdminLayout from '../../../../../layouts/FormLayout';
import { ICClient } from '../../../../../assets/icons/nav-icon/client.icon';

const ClientManagement = () => {
  const params = useParams<{ client_id: string }>();

  const updateClient = useUpdateClient();
  const clientDetail = useQueryClientDetail(params.client_id);

  const handleSubmitForm = (values: IClientValuesParams) => {
    const updatePayload = {
      name: values.name,
      phoneNumber: values.phoneNumber,
      address: values.address,
      email: values.email,
    };

    updateClient.mutate({ clientId: params.client_id, payload: updatePayload });
  };

  if (clientDetail.isLoading && !clientDetail.data) {
    return <Text>Loading Initial Data...</Text>;
  }

  return (
    <FormAdminLayout
      title="Edit Client"
      icon={<ICClient width={25} height={25} />}
    >
      <ClientForm
        initialValues={{
          address: clientDetail.data?.address,
          email: clientDetail.data?.email,
          name: clientDetail.data?.name,
          phoneNumber: clientDetail.data?.phoneNumber,
        }}
        isLoading={updateClient.isSuccess}
        onSubmit={handleSubmitForm}
      />
    </FormAdminLayout>
  );
};

export default ClientManagement;
