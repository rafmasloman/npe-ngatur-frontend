'use client';

import { API_ROUTES } from '../../../../../constant/api_routes';
import UserForm, {
  IUserFormValuesParams,
} from '../../../../../features/user/components/UserForm';
import { http } from '../../../../../libs/http';
import userService from '../../../../../services/user/UserService';
import useQueryUserDetail from '../../../../../services/user/hooks/useQueryUserDetail';
import { Text } from '@mantine/core';
import TokenUtils from '../../../../../utils/token';
import { cookieServer } from '../../../../../utils/cookie-server';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
  useQuery,
} from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import useUpdateUser from '../../../../../services/user/hooks/useUpdateUser';
import useChangeUserPassword from '../../../../../services/auth/hooks/useChangeUserPassword';

// const getUserDetail = async (userId: string) => {
//   const userDetail = await http.get(
//     `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/${API_ROUTES.USER}/${userId}`,
//     {
//       headers: {
//         Authorization: `Bearer ${(await cookieServer()).getCookie()}`,
//       },
//     },
//   );

//   const response = await userDetail.data;
//   return response;
// };

const EditUserManagement = () => {
  //   const queryClient = new QueryClient();

  //   const user = await queryClient.fetchQuery({
  //     queryKey: ['user-detail-ssr', params.user_id],
  //     queryFn: () => getUserDetail(params.user_id),
  //   });

  //   console.log('detail prefetch : ', detail.data);

  //   const user = await getUserDetail(params.user_id);
  //   console.log('user detail : ', user.data);

  const params = useParams<{ user_id: string }>();
  const user = useQueryUserDetail(params.user_id);

  const updateUser = useUpdateUser();
  const changeUserPassword = useChangeUserPassword();

  const handleSubmitForm = (values: IUserFormValuesParams) => {
    const updatePayload = {
      username: values.username,
      email: values.email,
      firstname: values.firstname,
      lastname: values.lastname,
      role: values.role,
    };
    console.log('update payload : ', updatePayload);

    updateUser.mutate({ userId: params.user_id, payload: updatePayload });

    if (values.newPassword) {
      if (updateUser.isSuccess && !!updateUser.data) {
        changeUserPassword.mutate({
          userId: params.user_id,
          newPassword: values.newPassword,
        });
      }
    }
  };

  if (user.isLoading && !user.data) {
    return <Text>Loading Initial Data...</Text>;
  }

  return (
    <UserForm
      onSubmit={handleSubmitForm}
      isLoading={updateUser.isSuccess}
      initialValues={{
        email: user.data?.email,
        username: user.data?.username,
        firstname: user.data?.firstname,
        lastname: user.data?.lastname,
        role: user.data?.role,
      }}
    />
  );
};

export default EditUserManagement;
