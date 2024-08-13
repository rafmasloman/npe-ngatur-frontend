import { useEffect, useState } from 'react';
import useQueryAllUsers from '../../../services/user/hooks/useQueryAllUsers';

const useUserOption = () => {
  const queryUsers = useQueryAllUsers();
  const [userOptions, setUserOptions] = useState<
    { label: string; value: string }[] | undefined
  >([]);

  const filterUserMember = queryUsers.data?.filter((user) => {
    // console.log('user : ', user.role !== 'ADMIN' ? { ...user } : null);

    if (!user.member && user.role !== 'ADMIN') {
      return {
        label: `${user.firstname} ${user.lastname}`,
        value: user.id,
      };
    }
  });

  console.log('filter user member : ', filterUserMember);

  useEffect(() => {
    const getFilterData = filterUserMember?.map((member) => {
      return {
        label: `${member.firstname} ${member.lastname}`,
        value: member.id,
      };
    });

    setUserOptions(getFilterData);
  }, [queryUsers.data, filterUserMember]);

  return { queryUsers, userOptions };
};

export default useUserOption;
