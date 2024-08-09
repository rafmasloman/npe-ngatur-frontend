'use client';

import UserForm, {
  IUserFormValuesParams,
} from '../../../../features/user/components/UserForm';
import useCreateUser from '../../../../services/user/hooks/useCreateUser';

const AddUserManagement = () => {
  const createUser = useCreateUser();

  const handleSubmitForm = (values: IUserFormValuesParams) => {
    const createPayload = {
      username: values.username,
      email: values.email,
      password: values.password,
      firstname: values.firstname,
      lastname: values.lastname,
      role: values.role,
    };

    createUser.mutate(createPayload);
  };

  return (
    <UserForm isLoading={createUser.isSuccess} onSubmit={handleSubmitForm} />
  );
};

export default AddUserManagement;
