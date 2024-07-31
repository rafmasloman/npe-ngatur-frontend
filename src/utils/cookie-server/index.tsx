'use server';

import { cookies } from 'next/headers';
import { TOKEN_NAME } from '../../constant/token.constant';

export const cookieServer = async () => {
  return {
    getCookie: () => {
      const value = cookies().get(TOKEN_NAME)?.value;

      return value;
    },

    setCookie: (token: string) => {
      const value = cookies().set(TOKEN_NAME, token);

      return value;
    },
  };
};
