'use client';

import { Text } from '@mantine/core';
import { ICMember } from '../../../../assets/icons/nav-icon/member.icon';
import MemberForm, {
  IMemberFormValuesParams,
} from '../../../../features/member/components/MemberForm';
import { useGetUserNonMember } from '../../../../features/member/hooks/useGetUserNonMember';
import FormAdminLayout from '../../../../layouts/FormLayout';
import useCreateMember from '../../../../services/member/hooks/useCreateMember';

const AddMemberManagement = () => {
  const createMember = useCreateMember();
  const userSelectOption = useGetUserNonMember();

  const handleSubmitForm = (values: any) => {
    const createPayload = {
      userId: values.userId,
      phoneNumber: values.phoneNumber,
      gender: values.gender,
      birthDate: values.birthDate as any,
      position: values.position,
    };

    createMember.mutate(createPayload);
  };

  // if (userSelectOption.isLoading && !userSelectOption.data) {
  //   return <Text>Loading Data....</Text>;
  // }

  return (
    <FormAdminLayout
      title="Tambah Member"
      icon={<ICMember width={25} height={25} />}
    >
      <MemberForm
        onSubmit={handleSubmitForm}
        isLoading={createMember.isSuccess}
        options={{ userOption: userSelectOption.data }}
      />
    </FormAdminLayout>
  );
};

export default AddMemberManagement;
