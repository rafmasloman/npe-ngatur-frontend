import { useEffect, useState } from 'react';
import BaseSelectInput from '../../../../components/Input/BaseSelectInput';
import { useQueryAllMembers } from '../../../../services/member/hooks/useQueryAllMembers';
import BaseButton from '../../../../components/Button/BaseButton';
import { BsPlus } from 'react-icons/bs';
import { Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useParams } from 'next/navigation';
import useInviteMember from '../../../../services/project/hooks/useInviteMember';

const InviteMemberForm = () => {
  const params = useParams<{ project_id: string }>();
  const [membersOption, setMembersOption] = useState<any>([]);
  const members = useQueryAllMembers();

  const invite = useInviteMember();

  const form = useForm({
    initialValues: {
      member: '',
    },
  });

  const handleSubmitInvitation = form.onSubmit((values) => {
    const payload = {
      projectId: params.project_id,
      member: values.member,
    };

    invite.mutate({ projectId: payload.projectId, member: payload.member });
  });

  useEffect(() => {
    const membersOptions = members?.data?.map((member: any) => {
      return {
        group: member.position,
        items: [
          {
            label: `${member.user.firstname} ${member.user.lastname}`,
            value: member.id,
          },
        ],
      };
    });

    setMembersOption(membersOptions);
  }, [members.data]);

  //   console.log('members : ', membersOption);

  return (
    <form onSubmit={handleSubmitInvitation}>
      <Stack gap={30}>
        <BaseSelectInput
          data={membersOption}
          placeholder="Pilih Anggota Crew"
          label="Members"
          {...form.getInputProps('member')}
        />

        <BaseButton
          fullWidth
          variant="primary"
          type="submit"
          leftSection={<BsPlus className="text-2xl" />}
        >
          Undang Member
        </BaseButton>
      </Stack>
    </form>
  );
};

export default InviteMemberForm;
