'use client';

import { Container, Stack, Text } from '@mantine/core';
import { useParams } from 'next/navigation';
import useQueryPayrollDetail from '../../../../services/payroll/hooks/useQueryPayrollDetail';
import useUserOption from '../../../../features/member/hooks/useUserOption';
import FormAdminLayout from '../../../../layouts/FormLayout';
import PayrollForm from '../../../../features/payroll/components/PayrollForm';
import { ICPayroll } from '../../../../assets/icons/nav-icon/payroll.icon';

const AddPayrollManagement = () => {
  const params = useParams<{ payroll_id: string }>();
  const payroll = useQueryPayrollDetail(params.payroll_id);

  //   const updateMember = useUpdateMember();
  //   const users = useUserOption();

  const handleSubmitForm = (values: any) => {
    const updatePayload = {
      memberId: values.memberId,
      projectId: values.projectId,
      percent: values.percent,
    };

    // updateMember.mutate({ memberId: params.member_id, payload: updatePayload });
  };

  //   if (payroll.isLoading && !payroll.data && users.userOptions === undefined) {
  //     return <Text>Loading Initial Data...</Text>;
  //   }

  return (
    <Stack className="container mx-auto">
      <Stack>
        <Text className="uppercase font-medium">Your Total Salary</Text>
        <Text className="text-3xl">Rp 300.000</Text>
      </Stack>

      <FormAdminLayout
        title="Tambah Payroll"
        icon={<ICPayroll width={25} height={25} />}
      >
        <PayrollForm
          onSubmit={handleSubmitForm}

          // options={users.userOptions}
        />
      </FormAdminLayout>
    </Stack>
  );
};

export default AddPayrollManagement;
