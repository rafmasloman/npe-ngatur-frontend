import { useRouter } from 'next/navigation';
import TokenUtils from '../../utils/token';
import { IApiAuthLoginMutation } from '../../services/auth/AuthInterface';
import useLoginMutation from '../../services/auth/hooks/useLoginMutation';

export const useAuth = () => {
  const { push, replace } = useRouter();

  //   const { postLogin, isPending } = usePostLogin({ handleSucces: handleSucces });
  const mutate = useLoginMutation();

  const login = (userLogin: IApiAuthLoginMutation) => {
    // postLogin(userLogin);
    mutate.mutate(userLogin);
  };

  const logout = () => {
    TokenUtils.removeToken();

    push('/');
  };

  return {
    login,
    logout,
    isPending: mutate.isPending,
    isSuccess: mutate.isSuccess,
  };
};
