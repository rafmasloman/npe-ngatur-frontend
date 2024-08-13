// 'use client';

import { Divider, Stack } from '@mantine/core';
import BaseNumberInput from '../../../components/Input/BaseNumberInput';
import { BiPlus } from 'react-icons/bi';
import BaseButton from '../../../components/Button/BaseButton';
import { useForm, zodResolver } from '@mantine/form';
import { payrollSchema } from '../helper/payrollSchema';
import BaseSelectInput from '../../../components/Input/BaseSelectInput';

// import { Grid, Group } from '@mantine/core';
// import { useForm } from '@mantine/form';
// import BaseButton from '../../../components/Button/BaseButton';
// import { IconPlus } from 'tabler-icons';
// import BaseTextInput from '../../../components/Input/BaseTextInput';
// import BaseSelectInput from '../../../components/Input/BaseSelectInput';
// // import useUserOption from '../hooks/useUserOption';
// import { useEffect, useState } from 'react';
// import useQueryMemberNonPayroll from '../../../services/payroll/hooks/useQueryMemberNonPayroll';
// import { useParams } from 'next/navigation';

// interface IDetailPayrollParams {
//   member: {
//     user: {
//       firstname: string;
//       lastname: string;
//     };
//   };
//   project: {
//     projectName: string;
//     projectIcon: string;
//   };
//   memberId: string;
//   projectId: string;

//   percent: number;
// }

// export interface IPayrollFormValuesParams {
//   member: {
//     id: string;
//     user: {
//       firstname: string;
//       lastname: string;
//     };
//   };
//   project: {
//     projectName: string;
//     projectIcon: string;
//   };
//   memberId: string;
//   percent: number;
//   projectId: string;
// }

// interface IPayrollFormPropsType {
//   initialValues?: IDetailPayrollParams;
//   isLoading?: boolean;
//   options?: any;
//   onSubmit: (values: any) => void;
// }

// const PayrollForm = ({
//   initialValues,
//   options,
//   onSubmit,
// }: IPayrollFormPropsType) => {
//   const [userOptions, setUserOptions] = useState<any>([]);
//   const params = useParams<{ project_id: string }>();
//   const memberNonPayroll = useQueryMemberNonPayroll(params?.project_id);

//   const form = useForm({
//     initialValues: {
//       member: initialValues?.member || '',
//       percent: initialValues?.percent || 0,
//     },
//   });

//   //   useEffect(() => {
//   //     if (options) {
//   //       const userSelectOptions = options?.map((op: any) => op);

//   //       setUserOptions([
//   //         {
//   //           label: `${initialValues?.user?.firstname}`,
//   //           value: initialValues?.userId,
//   //         },
//   //         ...userSelectOptions,
//   //       ]);
//   //     }
//   //   }, [options, initialValues]);

//   useEffect(() => {
//     if (memberNonPayroll.data) {
//       setUserOptions(
//         memberNonPayroll.data.map((member: any) => {
//           return {
//             label: `${member.user.fullname}`,
//             value: member.id,
//           };
//         }),
//       );
//     }
//   }, [memberNonPayroll.data]);

//   return (
//     <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
//       <Grid gutter={'xl'}>
//         <Grid.Col span={{ base: 12, sm: 6 }}>
//           <BaseSelectInput
//             label="Members"
//             placeholder="Pilih Member"
//             data={userOptions.length <= 0 ? [] : userOptions}
//             searchable
//             {...form.getInputProps('member')}
//           />
//         </Grid.Col>

//         <Grid.Col span={{ base: 12, sm: 6 }}>
//           <BaseTextInput
//             withAsterisk
//             placeholder="Persen Gaji"
//             label="Jumlah Persen Gaji"
//             type="number"
//             {...form.getInputProps('percent')}
//           />
//         </Grid.Col>

//         <Grid.Col span={12} mt={30}>
//           <Group align="left">
//             <BaseButton
//               type="submit"
//               //   loading={isPending}
//               variant="primary"
//               leftSection={<IconPlus />}
//             >
//               {!initialValues ? 'Tambah Payroll' : 'Simpan Perubahan'}
//             </BaseButton>
//           </Group>
//         </Grid.Col>
//       </Grid>
//     </form>
//   );
// };

// export default PayrollForm;

interface IDetailPayrollParams {
  percent: number;
  status?: string;
}

export interface IPayrollFormValuesParams {
  percent: number;
  status?: string;
}

interface IPayrollFormPropsType {
  initialValues?: IDetailPayrollParams;
  isLoading?: boolean;
  options?: any;
  onSubmit: (values: any) => void;
}

const PayrollForm = ({ initialValues, onSubmit }: IPayrollFormPropsType) => {
  const form = useForm({
    validate: zodResolver(payrollSchema),
    initialValues: {
      percent: initialValues?.percent,
      status: initialValues?.status,
    },
  });

  const handleSubmitForm = form.onSubmit((values) => onSubmit(values));

  return (
    <form onSubmit={handleSubmitForm}>
      <Divider className="mt- mb-5" />

      <Stack gap={20}>
        <BaseNumberInput
          label="Percent Payroll"
          description="Memberikan gaji dari potongan persen harga project"
          placeholder="Masukkan Persen"
          withAsterisk
          min={1}
          max={100}
          {...form.getInputProps('percent')}
        />

        {!initialValues ? null : (
          <BaseSelectInput
            label="Status Pembayaran"
            description="Admin ubah status pembayaran gaji jika sudah dibayar"
            placeholder="Pilih Status Pembayaran"
            data={['PAID', 'UNPAID']}
            {...form.getInputProps('status')}
          />
        )}
      </Stack>

      <BaseButton
        leftSection={<BiPlus className="text-lg" />}
        variant="secondary"
        mt={'xl'}
        fullWidth
        type="submit"
      >
        {!initialValues ? 'Tambah Payroll' : 'Ubah Payroll'}
      </BaseButton>
    </form>
  );
};

export default PayrollForm;
