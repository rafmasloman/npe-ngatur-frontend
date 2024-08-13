'use client';

import { Text } from '@mantine/core';
import { useParams } from 'next/navigation';
import FormMilestoneContainer from '../../../../../../../features/projects/project_detail/Tab/Milestone/components/FormMilestoneContainer';
import { ICMilestone } from '../../../../../../../assets/icons/nav-icon/milestone.icon';
import MilestoneForm from '../../../../../../../features/projects/project_detail/Tab/Milestone/components/MilestoneForm';
import useUserOption from '../../../../../../../features/member/hooks/useUserOption';
import useQueryMilestoneDetail from '../../../../../../../services/milestone/hooks/useQueryDetailMilestone';
import useUpdateMilestone from '../../../../../../../services/milestone/hooks/useUpdateMilestone';

const EditMilestoneManagement = () => {
  const params = useParams<{ project_id: string; milestone_id: string }>();
  const milestone = useQueryMilestoneDetail(params.milestone_id);
  const updateMilestone = useUpdateMilestone();

  // const users = useUserOption();

  const handleSubmitForm = (values: any) => {
    const updatePayload = {
      milestoneName: values.milestoneName,
      projectId: params.project_id,
      startedDate: values.startedDate,
      endDate: values.endDate,
      member: values.member,
    };

    updateMilestone.mutate({
      milestoneId: params.milestone_id,
      payload: updatePayload,
    });
  };

  if (milestone.isLoading && !milestone.data) {
    return <Text>Loading Initial Data...</Text>;
  }

  return (
    <FormMilestoneContainer
      title="Edit Milestone"
      icon={<ICMilestone width={25} height={25} />}
    >
      <MilestoneForm
        onSubmit={handleSubmitForm}
        initialValues={{
          milestoneName: milestone.data.milestoneName,
          startedDate: milestone.data.startedDate,
          endDate: milestone.data.endDate,
          member: milestone.data.member,
        }}
        // options={users.userOptions}
      />
    </FormMilestoneContainer>
  );
};

export default EditMilestoneManagement;
