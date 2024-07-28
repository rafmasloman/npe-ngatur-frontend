import { API_ROUTES } from '../../constant/api_routes';
import { http } from '../../libs/http';
import { IApiUpdateProfileMutation } from './ProfileInterface';

class ProfileServiceApi {
  async getUserProfile(userId?: string) {
    try {
      const response = await http.get(`${API_ROUTES.PROFILE}/${userId}`);

      const data = await response.data;

      console.log('data : ', data);

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getUserProfilePicture(userId: string) {
    try {
      const response = await http.get(
        `${API_ROUTES.PROFILE}/picture/${userId}`,
      );

      const data = await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async updateProfile(params: {
    userId: string;
    payload: IApiUpdateProfileMutation;
  }) {
    console.log('user id api : ', params.userId);

    try {
      const response = await http.put(
        `${API_ROUTES.PROFILE}/${params.userId}`,
        params.payload,
      );

      const data = await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async updateProfilePicture(params: { userId: string; payload: FormData }) {
    try {
      const response = await http.put(
        `${API_ROUTES.PROFILE}/profilePicture/${params.userId}`,
        params.payload,
      );

      const data = await response.data;
      console.log('upload profile : ', data);

      return data;
    } catch (error) {
      console.log('error response : ', error);

      throw error;
    }
  }
}

const profileService = new ProfileServiceApi();

export default profileService;
