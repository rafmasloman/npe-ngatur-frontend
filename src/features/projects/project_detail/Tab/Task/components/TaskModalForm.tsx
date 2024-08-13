import { Grid, Stack } from '@mantine/core';
import BaseSelectInput from '../../../../../../components/Input/BaseSelectInput';
import BaseDateInput from '../../../../../../components/Input/BaseDateInput';
import BaseMultiSelectInput from '../../../../../../components/Input/BaseMultiSelect';
import BaseButton from '../../../../../../components/Button/BaseButton';
import { IconPlus } from 'tabler-icons';
import { COLORS } from '../../../../../../constant/colors';
import { useForm } from '@mantine/form';
import BaseTextInput from '../../../../../../components/Input/BaseTextInput';
import { useQueryAllMilestones } from '../../../../../../services/milestone/hooks/useQueryAllMilestone';
import { useEffect, useState } from 'react';
import { useGetMilestonesDeadline } from '../hooks/useGetMilestoneDeadline';

interface ITaskInitialValueParams {
  taskId?: string;
  name?: string;
  status?: string;
  milestone?: {
    id?: string;
    milestoneName?: string;
  };
  member?: any[];
  deadline?: Date;
  priority?: string;
}

interface ITaskFormPropsType {
  initialValues?: ITaskInitialValueParams;
  onSubmit: (values: any) => void;
  options: {
    member: any;
    milestone?: { id: string; milestoneName: string; endDate: string }[];
  };
}

const TaskModalForm = ({
  initialValues,
  options,
  onSubmit,
}: ITaskFormPropsType) => {
  const [isMilestoneActive, setIsMilestoneActive] = useState(false);
  const [milestoneID, setMilestoneID] = useState<string | undefined>(undefined);

  const milestoneDeadline = useGetMilestonesDeadline(milestoneID);

  const form = useForm({
    initialValues: {
      name: initialValues?.name || '',
      milestoneId: initialValues?.milestone?.id?.toString() || '',
      member:
        initialValues?.member?.map((m) => {
          return m.id;
        }) || [],
      priority: initialValues?.priority || '',
      endDate: !initialValues?.deadline
        ? null
        : new Date(initialValues?.deadline) || '',
      status: initialValues?.status || '',
    },
  });

  useEffect(() => {
    if (!!form.values.milestoneId) {
      setMilestoneID(form.values.milestoneId);
      setIsMilestoneActive(true);
    } else {
      setMilestoneID(undefined);
      setIsMilestoneActive(false);
    }
  }, [form.values.milestoneId, isMilestoneActive]);

  return (
    <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
      <Grid>
        <Grid.Col span={12}>
          <Stack>
            <BaseSelectInput
              //   data={milestoneOption}
              data={options.milestone?.map((milestone) => {
                return {
                  value: milestone.id.toString(),
                  label: `${milestone.milestoneName}`,
                };
              })}
              placeholder="Pilih Milestone"
              label="Milestone"
              withAsterisk
              {...form.getInputProps('milestoneId')}
            />
            {/* <Link
              href={'/milestone/add-milestone'}
              className="text-xs w-fit"
              style={{ color: COLORS.PRIMARY }}
            >
              Buat Milestone
            </Link> */}
          </Stack>
        </Grid.Col>

        <>
          <Grid.Col span={12}>
            <BaseTextInput
              withAsterisk
              placeholder="Masukkan Judul Task"
              label="Judul Task"
              radius={'md'}
              {...form.getInputProps('name')}
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <BaseDateInput
              label="Deadline"
              placeholder="Pilih Deadline"
              withAsterisk
              disabled={!isMilestoneActive}
              minDate={new Date()}
              maxDate={new Date(milestoneDeadline.data)}
              // maxDate={new Date(mlDeadline?.data?.endDate)}
              {...form.getInputProps('endDate')}
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <BaseSelectInput
              data={[
                {
                  label: 'To do',
                  value: 'TODO',
                },
                {
                  label: 'On Progres',
                  value: 'ON_PROGRESS',
                },
                {
                  label: 'Completed',
                  value: 'COMPLETED',
                },
              ]}
              placeholder="Pilih Status"
              label="Status"
              withAsterisk
              {...form.getInputProps('status')}
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <BaseSelectInput
              data={[
                { label: 'Low', value: 'LOW' },
                { label: 'Medium', value: 'MEDIUM' },
                { label: 'High', value: 'HIGH' },
              ]}
              placeholder="Pilih Tingkat Prioritas"
              label="Prioritas"
              withAsterisk
              {...form.getInputProps('priority')}
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <BaseMultiSelectInput
              data={options.member.map((ctx: any) => {
                return {
                  label: `${ctx.user.firstname} ${ctx.user.lastname}`,
                  value: ctx.id,
                };
              })}
              label="Tugaskan ke-"
              placeholder="Tambahkan tugas ke member"
              withAsterisk
              {...form.getInputProps('member')}
            />
          </Grid.Col>

          <Grid.Col span={12} mt={30}>
            <BaseButton
              variant="primary"
              type="submit"
              bg={COLORS.primary}
              leftSection={<IconPlus />}
              w={'100%'}
            >
              {!initialValues ? 'Tambah Task' : 'Edit Task'}
            </BaseButton>
          </Grid.Col>
        </>
      </Grid>
    </form>
  );
};

export default TaskModalForm;
