import {
  ActionIcon,
  Avatar,
  Button,
  Card,
  Checkbox,
  Grid,
  Group,
  Modal,
  ModalProps,
  Space,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useDebounce } from '@uidotdev/usehooks';
import { useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import useQueryProjects from '../../../services/project/hooks/useQueryProjects';
import { IProjectResponseApi } from '../../../services/project/ProjectsInterface';
import { FaRightFromBracket } from 'react-icons/fa6';
import { PAYROLL_PM_PAGE } from '../../../constant/page_routes';
import ProjectMenuCard from './ProjectMenuCard';

const ModalProjectPayroll = (props: ModalProps) => {
  const [searchTerm, setSearchTerm] = useState<any>('');
  const [results, setResults] = useState<IProjectResponseApi[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [projectId, setProjectId] = useState<string | null>(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const queryProjects = useQueryProjects({
    onSuccesCb(data) {},
    onErrorCb(error) {},
  });

  const handleChange = (e: any) => {
    setSearchTerm(e.currentTarget.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    setSearchTerm(formData.get('search'));

    e.target.reset();
    e.target.focus();
  };

  useEffect(() => {
    if (queryProjects.data) {
      if (debouncedSearchTerm) {
        setIsSearching(true);
        setResults(queryProjects.data);
      }
      setIsSearching(false);
    } else {
      setResults([]);
    }
  }, [debouncedSearchTerm, queryProjects.data]);

  return (
    <Modal
      opened={props.opened}
      radius={'lg'}
      onClose={props.onClose}
      classNames={{
        header: `border-t-[16px] border-0 border-t-solid border-t-neutral-400`,
        body: `px-5 py-5`,
      }}
      title={
        <Stack gap={5}>
          <Text ff={'poppins'} className="font-medium  text-lg">
            Daftar Projects
          </Text>
          <Text ff={'poppins'} className="text-sm text-neutral-400">
            Atur pembagian gaji untuk anggota tim
          </Text>
        </Stack>
      }
    >
      <form onSubmit={handleSubmit}>
        <Grid align="center">
          <Grid.Col span={10}>
            <TextInput
              name="search"
              radius={'md'}
              ff={'poppins'}
              classNames={{
                input: `w-full`,
                root: `w-full`,
              }}
              styles={{
                input: {
                  fontFamily: 'poppins',
                },
              }}
              leftSection={<BiSearch />}
              placeholder="Cari Project"
            />
          </Grid.Col>
          <Grid.Col span={2}>
            <ActionIcon
              //   className="h-full w-full"
              //   disabled={isSearching}
              type="submit"
              size={'lg'}
              radius={'md'}
              onChange={handleChange}
            >
              {isSearching ? '...' : <BiSearch />}
            </ActionIcon>
          </Grid.Col>
        </Grid>
      </form>

      <Space h={30} />

      <Stack className="h-[200px] overflow-scroll no-scrollbar">
        {results.length <= 0
          ? queryProjects.data?.map((project) => {
              return (
                <ProjectMenuCard key={project.id} project={{ ...project }} />
              );
            })
          : results.map((ctx) => {
              return <Text key={ctx.id}>{ctx.projectName}</Text>;
            })}
      </Stack>

      <Space h={30} />
    </Modal>
  );
};

export default ModalProjectPayroll;
