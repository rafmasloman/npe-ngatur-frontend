'use client';

import { Center, SimpleGrid, Stack, Text } from '@mantine/core';
import useQueryProjects from '../../../services/project/hooks/useQueryProjects';
import { useContext, useState } from 'react';
import ProjectCard from '../../../features/projects/components/ProjectCard';
import { AuthContext } from '../../../context/AuthContext';
import useQueryMemberProject from '../../../services/member/hooks/useQueryMemberProjects';
import Link from 'next/link';

const ProjectPage = () => {
  const user = useContext(AuthContext);

  const projects = useQueryMemberProject(user.user?.id);

  // if (projects.isLoading && !projects.data) {
  //   return <Text>Loading Your Project...</Text>;
  // }

  return (
    <Stack className="container mx-auto">
      <Text className="text-base font-semibold text-custom_black md:text-xl">
        Daftar Projects
      </Text>

      {projects.data?.member?.project.length <= 0 ? (
        <Center
          h={200}
          className="border-[3px] bg-white  border-neutral-200 border-dashed rounded-lg w-full"
        >
          <Text>Anda belum memiliki project</Text>
        </Center>
      ) : (
        <SimpleGrid
          cols={{ base: 1, sm: 2, lg: 4 }}
          spacing={{ base: 10, sm: 'xl' }}
        >
          {projects.data?.member?.project.map((project: any, index: number) => {
            return (
              <Link
                key={index}
                href={`/${
                  user?.user?.role === 'STAFF' ? 'staff' : 'project-manager'
                }/project/${project.id}`}
              >
                <ProjectCard key={index} {...project} />
              </Link>
            );
          })}
        </SimpleGrid>
      )}
    </Stack>
  );
};

export default ProjectPage;
