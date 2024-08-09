'use client';

import { Text } from '@mantine/core';
import { useParams } from 'next/navigation';
import useQueryMemberDetail from '../../../../../services/member/hooks/useQueryMemberDetail';
import MemberForm from '../../../../../features/member/components/MemberForm';
import useUpdateMember from '../../../../../services/member/hooks/useUpdateMember';
import FormAdminLayout from '../../../../../layouts/FormLayout';
import { ICMember } from '../../../../../assets/icons/nav-icon/member.icon';

const EditMemberManagement = () => {
  const params = useParams<{ member_id: string }>();
  const member = useQueryMemberDetail(params.member_id);

  const updateMember = useUpdateMember();
  // const users = useUserOption();

  const handleSubmitForm = (values: any) => {
    const updatePayload = {
      userId: values.userId,
      phoneNumber: values.phoneNumber,
      gender: values.gender,
      birthDate: values.birthDate as any,
      position: values.position,
    };

    updateMember.mutate({ memberId: params.member_id, payload: updatePayload });
  };

  if (member.isLoading && !member.data) {
    return <Text>Loading Initial Data...</Text>;
  }

  return (
    <FormAdminLayout
      title="Edit Member"
      icon={<ICMember width={25} height={25} />}
    >
      <MemberForm
        onSubmit={handleSubmitForm}
        isLoading={updateMember.isSuccess}
        initialValues={{
          userId: member.data?.userId,
          phoneNumber: member.data?.phoneNumber,
          gender: member.data?.gender,
          birthDate: member.data?.birthDate as any,
          position: member.data?.position,
          user: {
            firstname: member.data?.user.firstname,
            lastname: member.data?.user.lastname,
          },
        }}
        // options={users.userOptions}
      />
    </FormAdminLayout>
  );
};

export default EditMemberManagement;
