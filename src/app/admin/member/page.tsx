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
  CREATE_MEMBER_ADMIN_PAGE,
  MEMBER_ADMIN_PAGE,
} from '../../../constant/page_routes';
import { useConfirmationModal } from '../../../features/common/hooks/useConfirmationModal';
import ModalDelete from '../../../features/common/components/ModalDelete';
import Link from 'next/link';
import { useQueryAllMembers } from '../../../services/member/hooks/useQueryAllMembers';
import { ICMember } from '../../../assets/icons/nav-icon/member.icon';
import useDeleteMember from '../../../services/member/hooks/useDeleteMember';

const tableHead = [
  { key: 'fullname', title: 'Nama Member' },
  { key: 'phoneNumber', title: 'No. Telp' },
  { key: 'position', title: 'Jobdesk' },
  { key: 'action', title: 'Action' },
];

const MemberManagementPage = () => {
  const queryMembers = useQueryAllMembers();
  const router = useRouter();

  const deleteMember = useDeleteMember();

  const modal = useConfirmationModal();

  const handleDeleteUser = () => {
    deleteMember.mutate(modal.itemId);

    modal.close();
  };

  const tBody = queryMembers.data?.map((member, index) => {
    return (
      <Table.Tr key={index}>
        <Table.Td>{`${member.user.firstname} ${member.user.lastname}`}</Table.Td>
        <Table.Td>{member.phoneNumber}</Table.Td>
        <Table.Td>{member.position}</Table.Td>
        <Table.Td>
          <Group align="center">
            <ActionIcon
              variant="outline"
              radius={'xl'}
              color={'red'}
              c={COLORS.danger}
              opacity={'0.7'}
              size={'lg'}
              onClick={() => modal.handleConfirm(member.id)}
            >
              <IconTrash size={'1.125rem'} />
            </ActionIcon>

            <Link href={`${MEMBER_ADMIN_PAGE}/${member.id}/edit-member`}>
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

  if (queryMembers.isLoading) {
    return <Text className="text-center">Loading Member Data....</Text>;
  }

  return (
    <TableLayout
      tableTitle="Tabel Member"
      tableIcon={<ICMember width={25} height={25} />}
      headerRightSection={
        <BaseButton
          variant="primary"
          onClick={() => router.replace(CREATE_MEMBER_ADMIN_PAGE)}
        >
          Tambah Member
        </BaseButton>
      }
    >
      <ModalDelete
        title="Member"
        handleCloseBtn={modal.close}
        handleDeleteConfirmation={handleDeleteUser}
        opened={modal.opened}
        onClose={modal.close}
      />

      <BaseTable tableHead={tableHead} tableBody={tBody} />
    </TableLayout>
  );
};

export default MemberManagementPage;
