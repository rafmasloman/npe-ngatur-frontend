'use client';

import { Container, Group, Menu, SimpleGrid, Stack, Text } from '@mantine/core';
import useQueryProjects from '../../../services/project/hooks/useQueryProjects';
import { useState } from 'react';
import BaseButton from '../../../components/Button/BaseButton';
import { FaPlus } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import {
  CREATE_PROJECT_ADMIN_PAGE,
  PROJECTS_ADMIN_PAGE,
} from '../../../constant/page_routes';
import ProjectAdminCard from '../../../features/projects/components/ProjectCardAdmin';
import ActionMenu from '../../../features/common/components/ActionMenu';
import { COLORS } from '../../../constant/colors';
import { IconPencil, IconTrash } from 'tabler-icons';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import useDeleteProject from '../../../services/project/hooks/useDeleteProject';
import ModalDelete from '../../../features/common/components/ModalDelete';
import { useConfirmationModal } from '../../../features/common/hooks/useConfirmationModal';

const ProjectPMPage = () => {
  const [isProjectMenuOpen, setProjectMenuOpen] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);

  const router = useRouter();

  const deleteProject = useDeleteProject();

  const modal = useConfirmationModal();

  const handleDeleteProject = () => {
    console.log('id : ', modal.itemId);

    deleteProject.mutate(modal.itemId);

    modal.close();
  };

  const projects = useQueryProjects({
    onSuccesCb(data) {
      return data.data;
    },
    onErrorCb(error) {
      console.log('error : ', error);
    },
  });

  if (projects.isLoading) {
    return <Text>Loading Your Project...</Text>;
  }

  return (
    <Container size={'xl'}>
      <ModalDelete
        title="Project"
        description="Apakah anda yakin ingin menghapus project?"
        handleCloseBtn={modal.close}
        handleDeleteConfirmation={handleDeleteProject}
        opened={modal.opened}
        onClose={modal.close}
      />
      <Stack className="container mx-auto" gap={30}>
        <Group justify="space-between" align="center">
          <Text className="font-semibold text-2xl">Daftar Projects</Text>
          <BaseButton
            variant="primary"
            leftSection={<FaPlus size={16} />}
            onClick={() => {
              router.push(CREATE_PROJECT_ADMIN_PAGE);
            }}
          >
            Tambah Project
          </BaseButton>
        </Group>
        <SimpleGrid
          cols={{ base: 1, sm: 2, md: 3 }}
          spacing={{ base: 10, sm: 'xl' }}
        >
          {projects.data?.map((project) => {
            return (
              <div
                key={project.id}
                className="relative w-full   md:w-[320px]  lg:w-[350px] "
              >
                <div className="absolute z-30 right-6 top-2.5 cursor-pointer">
                  <ActionMenu
                    position="bottom"
                    opened={isProjectMenuOpen}
                    setOpened={setProjectMenuOpen}
                    actions={{
                      onDelete: (
                        <Menu.Item
                          leftSection={
                            <IconTrash size={20} color={COLORS.danger} />
                          }
                          className="text-red-500"
                          onClick={() => modal.handleConfirm(project.id)}
                        >
                          Hapus
                        </Menu.Item>
                      ),
                      onEdit: (
                        <Menu.Item
                          leftSection={
                            <IconPencil size={20} color={COLORS.secondary} />
                          }
                          className="text-blue-950"
                          component="a"
                          href={`/admin/project/${project.id}/edit-project`}
                        >
                          Edit
                        </Menu.Item>
                      ),
                    }}
                  />
                </div>
                <Link href={`${PROJECTS_ADMIN_PAGE}/${project.id}/detail`}>
                  <ProjectAdminCard {...project} />
                </Link>
              </div>
            );
          })}
        </SimpleGrid>
      </Stack>
    </Container>
  );
};

export default ProjectPMPage;
