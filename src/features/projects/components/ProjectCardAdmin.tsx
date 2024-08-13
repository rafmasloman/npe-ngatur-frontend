import {
  ActionIcon,
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
import moment from 'moment';
import { IoFileTrayStacked } from 'react-icons/io5';

const ProjectAdminCard = (props: IProjectResponseApi) => {
  return (
    <Card
      className={`bg- w-full z-20  h-full  bg-white  mb-10 lg:md-0 border-2 border-solid border-neutral-200  `}
      // w={300}
      //   h={height}
      radius={'lg'}
      shadow="lg"
      p={24}
      classNames={{
        root: `
                transition-all
                duration-300
                hover:shadow-[7px_7px_0px] 
                hover:-translate-x-[5px] 
                hover:-translate-y-[5px]  
                hover:shadow-[#1679AB]
                hover:border
                hover:border-neutral-300`,
      }}
      //   onMouseEnter={handleMouseEnter}
      //   onMouseLeave={handleMouseLeave}
    >
      <Flex direction={'column'} gap={'xl'} className="h-full justify-between">
        <Group justify="space-between" align="center">
          {!props.projectIcon ? (
            <ActionIcon
              size={'xl'}
              color="indigo"
              radius={'md'}
              variant="light"
            >
              <IoFileTrayStacked size={25} />
            </ActionIcon>
          ) : (
            <Avatar
              src={`${process.env.NEXT_PUBLIC_API_DOWNLOAD_FILES_URL}/projects/${props.projectIcon}`}
              alt="Project Logo"
              className="h-fit"
              size={40}
            />
          )}

          <Grid mt={25}>
            {props.platform?.split(',').map((platform, index) => {
              return (
                <Grid.Col
                  span={props.platform?.split(',').length > 1 ? 6 : 12}
                  key={index}
                >
                  <Box
                    className="text-xs text-center px-2.5 py-0.5"
                    bg={index % 2 === 0 ? COLORS.third : COLORS.secondary}
                    style={{
                      borderRadius: '7px',
                    }}
                  >
                    <Text c="white" className="text-xs">
                      {platform}
                    </Text>
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
          <Text c={COLORS.gray} className="line-clamp-3">
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
                {moment(props.endDate).format('DD MMMM YYYY')}
              </Text>
            </Group>
          </Stack>
        </Group>
      </Flex>
    </Card>
  );
};

export default ProjectAdminCard;
