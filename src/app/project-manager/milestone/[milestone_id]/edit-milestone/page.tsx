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
import MilestoneForm from '../../../../../features/projects/project_detail/Tab/Milestone/components/MilestoneForm';
import FormMilestoneContainer from '../../../../../features/projects/project_detail/Tab/Milestone/components/FormMilestoneContainer';
import { ICMilestone } from '../../../../../assets/icons/nav-icon/milestone.icon';
import useQueryMilestoneDetail from '../../../../../services/milestone/hooks/useQueryDetailMilestone';

const EditMilestoneManagement = () => {
  const params = useParams<{ milestone_id: string }>();
  const milestone = useQueryMilestoneDetail(params.milestone_id);

  const users = useUserOption();

  const handleSubmitForm = (values: any) => {
    const updatePayload = {
      userId: values.userId,
      phoneNumber: values.phoneNumber,
      gender: values.gender,
      birthDate: values.birthDate as any,
      position: values.position,
    };
  };

  if (
    milestone.isLoading &&
    !milestone.data &&
    users.userOptions === undefined
  ) {
    return <Text>Loading Initial Data...</Text>;
  }

  return (
    <FormMilestoneContainer
      title="Edit Milestone"
      icon={<ICMilestone width={25} height={25} />}
    >
      <MilestoneForm
        onSubmit={handleSubmitForm}
        // initialValues={{
        //   milestoneName: milestone.data.name,
        //   projectId: milestone.data.projectId
        // }}
        // options={users.userOptions}
      />
    </FormMilestoneContainer>
  );
};

export default EditMilestoneManagement;
