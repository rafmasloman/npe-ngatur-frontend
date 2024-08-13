import { Avatar, Card, Group, Text } from '@mantine/core';
import { PAYROLL_PM_PAGE } from '../../../constant/page_routes';
import { FaRightFromBracket } from 'react-icons/fa6';
import { IProjectResponseApi } from '../../../services/project/ProjectsInterface';

interface IProjectMenuCardProps {
  project: IProjectResponseApi;
}

const ProjectMenuCard = ({ project }: IProjectMenuCardProps) => {
  return (
    <Card
      key={project.id}
      withBorder
      className={`hover:bg-custom_black bg-white hover:text-white duration-300`}
      radius={'md'}
      component="a"
      href={`${PAYROLL_PM_PAGE}/${project.id}/add-payroll`}
    >
      <Group justify="space-between">
        <Group gap={10}>
          <Avatar
            className="h-fit"
            size={20}
            src={`${process.env.NEXT_PUBLIC_API_DOWNLOAD_FILES_URL}/projects/${project.projectIcon}`}
          />
          <Text ff={'poppins'} className={`font-medium text-2xl `}>
            {project.projectName}
          </Text>
        </Group>

        <FaRightFromBracket />
      </Group>
    </Card>
  );
};

export default ProjectMenuCard;
