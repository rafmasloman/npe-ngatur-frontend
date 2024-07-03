import {
  Avatar,
  Box,
  Card,
  Flex,
  Grid,
  Group,
  Stack,
  Text,
  Tooltip,
} from '@mantine/core';
import Link from 'next/link';
import { IProjectResponseApi } from '../../../services/project/ProjectsInterface';
import { COLORS } from '../../../constant/colors';
import { filterCompletedTask } from '../helpers/ProjectCardHelpers';

const ProjectCard = (props: IProjectResponseApi) => {
  return (
    <Link href={`/project/detail`}>
      <Card
        className={`w-full z-20  h-full bg-white  mb-10 lg:md-0 border-2 border-solid border-transparent hover:border-2 hover:border-solid  `}
        // w={300}
        //   h={height}
        radius={'lg'}
        shadow="lg"
        p={24}
        //   onMouseEnter={handleMouseEnter}
        //   onMouseLeave={handleMouseLeave}
      >
        <Flex
          direction={'column'}
          gap={'xl'}
          className="h-full justify-between"
        >
          <Group justify="space-between" align="center">
            <Avatar
              src={`${
                process.env.NEXT_PUBLIC_API_DOWNLOAD_FILES_URL
              }/projects/${props.projectIcon!}`}
              alt="Project Logo"
              // size={50}
              classNames={{
                image: `w-7 md:w-10 h-fit`,
                root: `w-fit h-fit`,
              }}
            />

            <Grid mt={10}>
              {props.platform.split(',').map((platform, index) => {
                return (
                  <Grid.Col
                    span={props.platform.split(',').length > 1 ? 6 : 12}
                    key={index}
                  >
                    <Box
                      className="text-xs text-center px-2.5 py-0.5"
                      bg={index % 2 === 0 ? COLORS.third : COLORS.secondary}
                      style={{
                        borderRadius: '7px',
                      }}
                    >
                      <Text color="white">{platform}</Text>
                    </Box>
                  </Grid.Col>
                );
              })}
            </Grid>
          </Group>
          <Stack>
            <Text fz={'1.75rem'} fw={600}>
              {props.projectName}
            </Text>
            <Text color={COLORS.gray} className="line-clamp-3">
              {props.description}
            </Text>
            <Text>
              Task Done :{' '}
              <span style={{ color: COLORS.success }}>
                {filterCompletedTask(props.task)?.length}
              </span>
              /{props.task?.length}
            </Text>
          </Stack>
          <Group justify="space-between">
            <Group style={{ position: 'relative' }}>
              <Avatar.Group spacing={'sm'}>
                {props.member?.map((m, index) => {
                  return (
                    <Tooltip
                      key={index}
                      label={`${m.user?.firstname} ${m.user?.lastname}`}
                    >
                      <Avatar
                        style={{ zIndex: index }}
                        radius={'xl'}
                        size={32}
                        src={`${process.env.NEXT_PUBLIC_API_DOWNLOAD_FILES_URL}/members/${m?.profilePicture}`}
                        className="border border-solid border-gray-300"
                      />
                    </Tooltip>
                  );
                })}
              </Avatar.Group>
            </Group>

            <Stack gap={5}>
              <Text className="text-xs md:text-sm">Deadline</Text>
              <Group gap={5}>
                <Text c="red" className="text-xs md:text-sm">
                  {props.endDate}
                </Text>
              </Group>
            </Stack>
          </Group>
        </Flex>
      </Card>
    </Link>
  );
};

export default ProjectCard;
