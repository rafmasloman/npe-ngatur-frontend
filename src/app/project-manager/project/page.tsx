'use client';

import { Container, SimpleGrid, Stack, Tabs, Text } from '@mantine/core';
import useQueryProjects from '../../../services/project/hooks/useQueryProjects';
import { useState } from 'react';
import ProjectCard from '../../../features/projects/components/ProjectCard';

const ProjectPage = () => {
  const projects = useQueryProjects({
    onSuccesCb(data) {
      return data.data;
    },
    onErrorCb(error) {
      console.log('error : ', error);
    },
  });

  console.log('projects loading : ', projects.data?.data);

  if (projects.isLoading) {
    return <Text>Loading Your Project...</Text>;
  }

  return (
    <Stack className="container mx-auto">
      <Text className="text-base font-semibold text-custom_black md:text-xl">
        Daftar Projects
      </Text>

      <SimpleGrid
        cols={{ base: 1, sm: 2, lg: 4 }}
        spacing={{ base: 10, sm: 'xl' }}
      >
        {projects.data?.data.map((project) => {
          return <ProjectCard key={project.id} {...project} />;
        })}
      </SimpleGrid>
    </Stack>
  );
};

export default ProjectPage;
