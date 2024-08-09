'use client';

import { Text } from '@mantine/core';
import { useParams } from 'next/navigation';
import useQueryMemberDetail from '../../../../../services/member/hooks/useQueryMemberDetail';
import MemberForm, {
  IMemberFormValuesParams,
} from '../../../../../features/member/components/MemberForm';
import useUpdateMember from '../../../../../services/member/hooks/useUpdateMember';
import useUserOption from '../../../../../features/member/hooks/useUserOption';
import FormAdminLayout from '../../../../../layouts/FormLayout';
import { ICMember } from '../../../../../assets/icons/nav-icon/member.icon';
import useQueryPayrollDetail from '../../../../../services/payroll/hooks/useQueryPayrollDetail';
import PayrollForm from '../../../../../features/payroll/components/PayrollForm';
import { ICPayroll } from '../../../../../assets/icons/nav-icon/payroll.icon';

const EditPayrollManagement = () => {
  const params = useParams<{ payroll_id: string }>();
  const payroll = useQueryPayrollDetail(params.payroll_id);

  //   const updateMember = useUpdateMember();
  const users = useUserOption();

  const handleSubmitForm = (values: any) => {
    const updatePayload = {
      memberId: values.memberId,
      projectId: values.projectId,
      percent: values.percent,
    };

    // updateMember.mutate({ memberId: params.member_id, payload: updatePayload });
  };

  if (payroll.isLoading && !payroll.data && users.userOptions === undefined) {
    return <Text>Loading Initial Data...</Text>;
  }

  return (
    <FormAdminLayout
      title="Edit Payroll"
      icon={<ICPayroll width={25} height={25} />}
    >
      <PayrollForm
        onSubmit={handleSubmitForm}
        initialValues={{
          percent: payroll?.data?.percent,
          status: payroll?.data?.transactionStatus,
        }}
        options={users.userOptions}
      />
    </FormAdminLayout>
  );
};

export default EditPayrollManagement;
