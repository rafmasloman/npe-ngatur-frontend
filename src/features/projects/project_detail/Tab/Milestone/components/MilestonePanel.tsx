import { Box, Group, Space, Stack, Text } from '@mantine/core';
import Link from 'next/link';
import { PROJECT_PM_PAGE } from '../../../../../../constant/page_routes';
import BaseButton from '../../../../../../components/Button/BaseButton';
import { IoAdd } from 'react-icons/io5';
import { useGetMilestonesByProject } from '../../../../../../services/milestone/hooks/useQueryMilestoneProject';
import { useParams } from 'next/navigation';
import MilestoneCard from './MilestoneCard';
import ModalDelete from '../../../../../common/components/ModalDelete';
import { useConfirmationModal } from '../../../../../common/hooks/useConfirmationModal';
import useDeleteMilestone from '../../../../../../services/milestone/hooks/useDeleteMilestone';
import { IconEdit, IconTrash } from 'tabler-icons';
import { COLORS } from '../../../../../../constant/colors';

interface IPanelPropsType {
  isRolePM?: boolean;
}

const MilestonePanel = ({ isRolePM }: IPanelPropsType) => {
  const params = useParams<{ project_id: string }>();

  const milestonesProject = useGetMilestonesByProject(params.project_id);

  const deleteMilestone = useDeleteMilestone();
  const modal = useConfirmationModal();

  const handleDeleteMilestone = () => {
    deleteMilestone.mutate(modal.itemId);

    modal.close();
  };

  if (!milestonesProject.data && milestonesProject.isLoading) {
    return <Text>Loading Milestone Data</Text>;
  }

  return (
    <>
      <ModalDelete
        title="Hapus Milestone"
        opened={modal.opened}
        onClose={modal.close}
        description="Anda yakin ingin menghapus milestone?"
        handleCloseBtn={modal.close}
        handleDeleteConfirmation={handleDeleteMilestone}
      />
      
      <Box className="container mx-auto">
        <Group justify="space-between">
          <Text className="font-semibold text-lg md:text-xl">
            Milestone Panel
          </Text>

          {isRolePM && (
            <Link
              href={`${PROJECT_PM_PAGE}/${params.project_id}/milestone/add-milestone`}
            >
              <BaseButton variant="primary" leftSection={<IoAdd />}>
                Tambah Milestone
              </BaseButton>
            </Link>
          )}
        </Group>

        <Space h={30} />

        <Stack>
          {milestonesProject.data.map((milestone: any) => {
            return (
              <MilestoneCard
                isRoleAccesable={isRolePM}
                key={milestone.id}
                actions={{
                  onDelete: isRolePM && (
                    <Group
                      gap={10}
                      onClick={() => modal.handleConfirm(milestone.id)}
                      className="cursor-pointer"
                      align="center"
                    >
                      <IconTrash width={18} height={18} color={COLORS.danger} />

                      <Text c={COLORS.danger}>Hapus</Text>
                    </Group>
                  ),
                  onEdit: isRolePM && (
                    <Group gap={10}>
                      <IconEdit
                        width={18}
                        height={18}
                        color={COLORS.secondary}
                      />
                      <Link
                        href={`${PROJECT_PM_PAGE}/${params.project_id}/milestone/${milestone.id}/edit-milestone`}
                        style={{
                          textDecoration: 'none',
                          color: COLORS.secondary,
                        }}
                      >
                        <Text>Edit</Text>
                      </Link>
                    </Group>
                  ),
                }}
                milestone={{
                  id: milestone.id,
                  milestoneName: milestone.milestoneName,
                  task: milestone.task,
                  endDate: milestone.endDate,
                  status: milestone.status,
                  progress: milestone.progress,
                }}
              />
            );
          })}
        </Stack>
      </Box>
    </>
  );
};

export default MilestonePanel;
