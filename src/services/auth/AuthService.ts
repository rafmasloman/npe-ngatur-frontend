import { API_ROUTES } from '../../constant/api_routes';
import { http } from '../../libs/http';
import { ApiBaseResponse } from '../../utils/api/base_response';
import { IApiAuthLoginMutation, IApiLoginResponse } from './AuthInterface';

class AuthServiceApi {
  async login(
    payload: IApiAuthLoginMutation,
  ): Promise<ApiBaseResponse<IApiLoginResponse>> {
    try {
      const response = await http.post(API_ROUTES.LOGIN, payload);

      const login: ApiBaseResponse<IApiLoginResponse> = await response.data;

      return login;
    } catch (error) {
      console.log('error login : ', error);

      throw error;
    }
  }

  async userCredential() {
    try {
      const response = await http.get(API_ROUTES.AUTH_CREDENTIAL);

      const credential = await response.data;

      return credential;
    } catch (error) {
      throw error;
    }
  }

  async changeUserPassword(params: { userId: string; newPassword: string }) {
    try {
      const response = await http.put(
        `${API_ROUTES.AUTH}/${params.userId}/change-user-password`,
        {
          newPassword: params.newPassword,
        },
      );

      const data = await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }
}

const authService = new AuthServiceApi();

export default authService;
