'use client';

import {
  Avatar,
  FileButton,
  Grid,
  Group,
  Image,
  Input,
  MultiSelect,
  NumberInput,
  Stack,
  Text,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import BaseButton from '../../../components/Button/BaseButton';
import { IconPlus } from 'tabler-icons';
import BaseTextInput from '../../../components/Input/BaseTextInput';
import BaseSelectInput from '../../../components/Input/BaseSelectInput';

import { useEffect, useState } from 'react';
import BaseDateInput from '../../../components/Input/BaseDateInput';
import { BsFileEarmarkArrowDown } from 'react-icons/bs';
import { BiUpload } from 'react-icons/bi';
import BaseNumberInput from '../../../components/Input/BaseNumberInput';
import moment from 'moment';
import useQueryMemberProject from '../../../services/member/hooks/useQueryMemberProjects';
import useQueryMemberPM from '../../../services/user/hooks/useQueryMemberPM';
import BaseMultiSelectInput from '../../../components/Input/BaseMultiSelect';
import { useClientNonHaveProject } from '../ui/hooks/useClientNonHaveProject';
import { useQueryAllClients } from '../../../services/client/hooks/useQueryAllClients';

interface IDetailProjectParams {
  projectName?: string;
  platform?: string;
  startedDate?: string;
  endDate?: string;
  description?: string;
  projectIcon?: File | any;
  clientId?: string;
  member?: any;
  price?: number;
}

export interface IProjectFormValuesParams {
  projectName: string;
  platform: string;
  startedDate: string;
  endDate: string;
  description: string;
  projectIcon: File | any;
  clientId: string;
  member: any[];
  price: number;
}

interface IProjectFormPropsType {
  initialValues?: IDetailProjectParams;
  isLoading?: boolean;
  formType: 'create-form' | 'edit-form';
  onSubmit: (values: any) => void;
}

const ProjectForm = ({
  initialValues,
  isLoading,
  onSubmit,
}: IProjectFormPropsType) => {
  const [fileLogo, setFileLogo] = useState<File | null>(null);
  const [iconFileSrc, setIconFileSrc] = useState<string | null>(null);

  const projectManager = useQueryMemberPM();

  // const { clientData } = useClientNonHaveProject();
  const clientData = useQueryAllClients();

  console.log('pm : ', projectManager.data);

  const form = useForm({
    initialValues: {
      projectName: initialValues?.projectName || '',
      platform:
        initialValues?.platform?.split(',').map((platform: any) => {
          return platform;
        }) || [],
      startedDate: !initialValues?.startedDate
        ? new Date()
        : new Date(initialValues?.startedDate) || '',
      endDate: !initialValues?.endDate
        ? new Date()
        : new Date(initialValues?.endDate) || '',
      // startedDate: initialValues?.startedDate || '',
      // endDate: initialValues?.endDate || '',
      clientId: initialValues?.clientId || '',
      description: initialValues?.description || '',
      projectIcon: initialValues?.projectIcon || '',
      image: '',
      price: initialValues?.price || 0,
      member:
        // initialValues?.member?.map((m: any) => {
        //   return m?.id;
        // })
        initialValues?.member?.id || [],
    },
    onValuesChange({ projectIcon }) {
      console.log('project icon value : ', projectIcon);

      setFileLogo(projectIcon);
    },
  });

  useEffect(() => {
    const temp = fileLogo;

    console.log('temp : ', temp);

    if (temp) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          setIconFileSrc(e.target.result as string);
        }
      };
      reader.readAsDataURL(temp);
    }
  }, [fileLogo]);

  console.log('project icon 1 : ', form.values.projectIcon);

  return (
    <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
      <Grid gutter={'xl'}>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <BaseTextInput
            withAsterisk
            placeholder="Masukkan Nama Project"
            label="Nama Project"
            {...form.getInputProps('projectName')}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6 }}>
          <BaseMultiSelectInput
            withAsterisk
            label="Project Platform"
            placeholder="Pilih Platform"
            data={['Website', 'Mobile', 'Desktop']}
            searchable
            {...form.getInputProps('platform')}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6 }}>
          <BaseSelectInput
            withAsterisk
            label="Client"
            placeholder="Pilih Client"
            data={clientData?.data?.map((client: any) => {
              return {
                label: `${client?.name}`,
                value: `${client?.id}`,
              };
            })}
            {...form.getInputProps('clientId')}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6 }}>
          <BaseSelectInput
            withAsterisk
            label="Project Manager"
            placeholder="Pilih PM"
            data={projectManager?.data?.map((pm: any) => {
              return {
                label: `${pm?.user?.firstname} ${pm?.user?.lastname}`,
                value: `${pm?.id}`,
              };
            })}
            {...form.getInputProps('member')}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Group>
            <BaseDateInput
              label="Tanggal Mulai"
              placeholder="Pilih Tanggal Mulai"
              withAsterisk
              valueFormat="DD MMM YYYY"
              //   minDate={new Date()}
              {...form.getInputProps('startedDate')}
            />
            <BaseDateInput
              label="Tanggal Selesai"
              placeholder="Pilih Tanggal Selesai"
              withAsterisk
              // minDate={new Date()}

              {...form.getInputProps('endDate')}
            />
          </Group>
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6 }}>
          <BaseNumberInput
            withAsterisk
            label="Harga Project"
            placeholder="Masukkan Harga Project"
            {...form.getInputProps('price')}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <BaseTextInput
            placeholder="Tulis Deskripsi Project"
            label="Deskripsi"
            {...form.getInputProps('description')}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          {/* {!initialValues?.projectIcon && !fileLogo ? (
            <FileButton
              accept="image/png, image/jpg, image/svg"
              {...form.getInputProps('projectIcon')}
            >
              {(props) => (
                <Input.Wrapper
                  label="Project Icon"
                  classNames={{
                    label: `mb-2.5`,
                  }}
                  withAsterisk
                  {...props}
                >
                  <Stack
                    align="center"
                    justify="center"
                    className="w-full h-full border-2 border-neutral-300 rounded-lg px-5 py-8 border-dashed"
                  >
                    <BsFileEarmarkArrowDown className="w-20 h-20 text-neutral-300" />

                    <Text className="text-base text-neutral-400">
                      Upload Project Icon
                    </Text>
                  </Stack>
                </Input.Wrapper>
              )}
            </FileButton>
          ) : (
            <FileButton
              accept="image/png, image/jpg, image/svg"
              {...form.getInputProps('projectIcon')}
            >
              {(props) => (
                <Input.Wrapper
                  label="Project Icon"
                  classNames={{
                    label: `mb-2.5`,
                  }}
                  withAsterisk
                  {...props}
                >
                  <Group>
                    <Avatar
                      size={30}
                      className="h-fit"
                      radius={'sm'}
                      src={
                        !iconFileSrc
                          ? `http://localhost:5000/api/v1/files/download/projects/${initialValues?.projectIcon}`
                          : iconFileSrc
                      }
                      alt="Project Icon"
                    />
                    <BaseButton
                      variant="secondary"
                      leftSection={<BiUpload className="text-primary" />}
                    >
                      Ganti Icon
                    </BaseButton>
                  </Group>
                </Input.Wrapper>
              )}
            </FileButton>
          )} */}

          {
            <FileButton
              accept="image/png, image/jpg, image/svg"
              {...form.getInputProps('projectIcon')}

              // onChange={setFileLogo}
            >
              {(props) =>
                !initialValues && !fileLogo ? (
                  <Input.Wrapper
                    label="Project Icon"
                    classNames={{
                      label: `mb-2.5`,
                    }}
                    withAsterisk
                    {...props}
                  >
                    <Stack
                      align="center"
                      justify="center"
                      className="w-full h-full border-2 border-neutral-300 rounded-lg px-5 py-8 border-dashed"
                    >
                      <BsFileEarmarkArrowDown className="w-20 h-20 text-neutral-300" />

                      <Text className="text-base text-neutral-400">
                        Upload Project Icon
                      </Text>
                    </Stack>
                  </Input.Wrapper>
                ) : (
                  <Input.Wrapper
                    label="Project Icon"
                    classNames={{
                      label: `mb-2.5`,
                    }}
                    withAsterisk
                    {...props}
                  >
                    <Group>
                      <Avatar
                        size={30}
                        className="h-fit"
                        radius={'sm'}
                        src={
                          !iconFileSrc
                            ? `http://localhost:5000/api/v1/files/download/projects/${initialValues?.projectIcon}`
                            : iconFileSrc
                        }
                        alt="Project Icon"
                      />
                      <BaseButton
                        variant="secondary"
                        leftSection={<BiUpload className="text-primary" />}
                      >
                        Ganti Icon
                      </BaseButton>
                    </Group>
                  </Input.Wrapper>
                )
              }
            </FileButton>
          }
        </Grid.Col>

        <Grid.Col span={12} mt={30}>
          <Group align="left">
            <BaseButton
              type="submit"
              loading={isLoading}
              variant="primary"
              leftSection={<IconPlus />}
            >
              {!initialValues ? 'Tambah Project' : 'Simpan Perubahan'}
            </BaseButton>
          </Group>
        </Grid.Col>
      </Grid>
    </form>
  );
};

export default ProjectForm;
