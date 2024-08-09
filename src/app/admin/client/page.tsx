'use client';

import { ActionIcon, Group, Table, Text } from '@mantine/core';
import TableLayout from '../../../layouts/TableLayout';
import BaseButton from '../../../components/Button/BaseButton';
import BaseTable from '../../../components/Table/BaseTable';
import { COLORS } from '../../../constant/colors';
import { IconTrash } from 'tabler-icons';
import { IconPencilCode } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import {
  CLIENT_ADMIN_PAGE,
  CREATE_CLIENT_ADMIN_PAGE,
  CREATE_MEMBER_ADMIN_PAGE,
  MEMBER_ADMIN_PAGE,
} from '../../../constant/page_routes';
import { useConfirmationModal } from '../../../features/common/hooks/useConfirmationModal';
import ModalDelete from '../../../features/common/components/ModalDelete';
import Link from 'next/link';
import { useQueryAllMembers } from '../../../services/member/hooks/useQueryAllMembers';
import { ICMember } from '../../../assets/icons/nav-icon/member.icon';
import useDeleteMember from '../../../services/member/hooks/useDeleteMember';
import useDeleteClient from '../../../services/client/hooks/useDeleteClient';
import { useQueryAllClients } from '../../../services/client/hooks/useQueryAllClients';
import { ICClient } from '../../../assets/icons/nav-icon/client.icon';

const tableHead = [
  { key: 'fullname', title: 'Nama Client' },
  { key: 'email', title: 'Email' },
  { key: 'phoneNumber', title: 'No. Telp' },
  { key: 'address', title: 'Alamat' },
  { key: 'action', title: 'Action' },
];

const ClientManagementPage = () => {
  const queryClients = useQueryAllClients();
  const router = useRouter();

  const deleteClient = useDeleteClient();

  const modal = useConfirmationModal();

  const handleDeleteUser = () => {
    deleteClient.mutate(modal.itemId);

    modal.close();
  };

  const tBody = queryClients.data?.map((client, index) => {
    return (
      <Table.Tr key={index}>
        <Table.Td>{`${client.name}`}</Table.Td>
        <Table.Td>{client.email}</Table.Td>
        <Table.Td>{client.phoneNumber}</Table.Td>
        <Table.Td>{client.address}</Table.Td>
        <Table.Td>
          <Group align="center">
            <ActionIcon
              variant="outline"
              radius={'xl'}
              color={'red'}
              c={COLORS.danger}
              opacity={'0.7'}
              size={'lg'}
              onClick={() => modal.handleConfirm(client.id)}
            >
              <IconTrash size={'1.125rem'} />
            </ActionIcon>

            <Link href={`${CLIENT_ADMIN_PAGE}/${client.id}/edit-client`}>
              <ActionIcon
                variant="outline"
                radius={'xl'}
                color={'gray'}
                c={COLORS.secondary}
                opacity={'0.7'}
                size={'lg'}
              >
                <IconPencilCode size={'1.125rem'} />
              </ActionIcon>
            </Link>
          </Group>
        </Table.Td>
      </Table.Tr>
    );
  });

  if (queryClients.isLoading) {
    return <Text className="text-center">Loading Member Data....</Text>;
  }

  return (
    <TableLayout
      tableTitle="Tabel Client"
      tableIcon={<ICClient width={25} height={25} />}
      headerRightSection={
        <BaseButton
          variant="primary"
          onClick={() => router.push(CREATE_CLIENT_ADMIN_PAGE)}
        >
          Tambah Client
        </BaseButton>
      }
    >
      <ModalDelete
        title="Client"
        handleCloseBtn={modal.close}
        handleDeleteConfirmation={handleDeleteUser}
        opened={modal.opened}
        onClose={modal.close}
      />

      <BaseTable tableHead={tableHead} tableBody={tBody} />
    </TableLayout>
  );
};

export default ClientManagementPage;
