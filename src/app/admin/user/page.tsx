'use client';

import { ActionIcon, Group, Table, Text } from '@mantine/core';
import TableLayout from '../../../layouts/TableLayout';
import { ICUser } from '../../../assets/icons/nav-icon/user.icon';
import BaseButton from '../../../components/Button/BaseButton';
import useQueryAllUsers from '../../../services/user/hooks/useQueryAllUsers';
import BaseTable from '../../../components/Table/BaseTable';
import { COLORS } from '../../../constant/colors';
import { IconTrash } from 'tabler-icons';
import { IconPencilCode } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import {
  CREATE_USER_ADMIN_PAGE,
  USER_ADMIN_PAGE,
} from '../../../constant/page_routes';
import useDeleteUser from '../../../services/user/hooks/useDeleteUser';
import { useConfirmationModal } from '../../../features/common/hooks/useConfirmationModal';
import ModalDelete from '../../../features/common/components/ModalDelete';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const tableHead = [
  { key: 'fullname', title: 'Name' },
  { key: 'email', title: 'Email' },
  { key: 'role', title: 'Role' },
  { key: 'action', title: 'Action' },
];

const UserManagementPage = () => {
  const queryUsers = useQueryAllUsers();
  const router = useRouter();

  const deleteUser = useDeleteUser();

  const modal = useConfirmationModal();

  const handleDeleteUser = () => {
    deleteUser.mutate(modal.itemId);

    modal.close();
  };

  const tBody = queryUsers.data?.map((user, index) => {
    return (
      <Table.Tr key={index}>
        <Table.Td>{`${user.firstname} ${user.lastname}`}</Table.Td>
        <Table.Td>{user.email}</Table.Td>
        <Table.Td>{user.role}</Table.Td>
        <Table.Td>
          <Group align="center">
            <ActionIcon
              variant="outline"
              radius={'xl'}
              color={'red'}
              c={COLORS.danger}
              opacity={'0.7'}
              size={'lg'}
              onClick={() => modal.handleConfirm(user.id)}
            >
              <IconTrash size={'1.125rem'} />
            </ActionIcon>

            <Link href={`${USER_ADMIN_PAGE}/${user.id}/edit-user`} replace>
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

  if (!queryUsers.data && queryUsers.isLoading) {
    return <Text>Loading User Data....</Text>;
  }

  if (deleteUser.isPending) {
    return <Text>Loading User Data....</Text>;
  }

  return (
    <TableLayout
      tableTitle="Tabel User"
      tableIcon={<ICUser width={25} height={25} />}
      headerRightSection={
        <BaseButton
          variant="primary"
          onClick={() => router.push(CREATE_USER_ADMIN_PAGE)}
        >
          Tambah User
        </BaseButton>
      }
    >
      <ModalDelete
        handleCloseBtn={modal.close}
        handleDeleteConfirmation={handleDeleteUser}
        opened={modal.opened}
        onClose={modal.close}
        title="User"
      />

      <BaseTable tableHead={tableHead} tableBody={tBody} />
    </TableLayout>
  );
};

export default UserManagementPage;
