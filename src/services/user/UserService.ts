import { API_ROUTES } from '../../constant/api_routes';
import { http } from '../../libs/http';
import { ApiBaseResponse } from '../../utils/api/base_response';
import {
  IApiCreatePostUserMutationParams,
  IApiGetUserQueryResponse,
  IApiQueryUserNonMemberResponse,
  IApiUpdatePutUserMutationParams,
} from './UserInterface';

class UserServiceApi {
  // private routesName = `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/${API_ROUTES.USER}`;

  // constructor() {
  //   this.createPostUserMutation = this.createPostUserMutation.bind(this);
  //   this.deleteUserMutation = this.deleteUserMutation.bind(this);
  //   this.updatePutUserMutation = this.updatePutUserMutation.bind(this);
  // }

  async getAllUsersQuery(): Promise<
    ApiBaseResponse<IApiGetUserQueryResponse[]>
  > {
    try {
      const response = await http.get(API_ROUTES.USER);

      const data: ApiBaseResponse<IApiGetUserQueryResponse[]> =
        await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getUserQueryStaff() {
    try {
      const response = await http.get(`${API_ROUTES.USER}/staff`);

      const data = await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getUserNonMember(): Promise<
    ApiBaseResponse<IApiQueryUserNonMemberResponse[]>
  > {
    try {
      const response = await http.get(`${API_ROUTES.USER}/non-member`);

      const data: ApiBaseResponse<IApiQueryUserNonMemberResponse[]> =
        await response.data;

      console.log('data : ', data);

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getUserQueryById(
    userId: string,
  ): Promise<ApiBaseResponse<IApiGetUserQueryResponse>> {
    try {
      const response = await http.get(`${API_ROUTES.USER}/${userId}`);

      const data: ApiBaseResponse<IApiGetUserQueryResponse> =
        await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getMemberProjectManagerRole() {
    try {
      const response = await http.get(`${API_ROUTES.MEMBER}/project-manager`);

      const data = await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getUserProjects(userId: string) {
    try {
      const response = await http.get(`${API_ROUTES}/project/member/${userId}`);

      const data = await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getUserMemberProjects(userId: string) {
    try {
      const response = await http.get(
        `${API_ROUTES.USER}/project/user/${userId}`,
      );

      const data = await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async createPostUserMutation(
    payload: IApiCreatePostUserMutationParams,
  ): Promise<ApiBaseResponse<IApiGetUserQueryResponse>> {
    try {
      const response = await http.post(API_ROUTES.USER, payload);

      const data: ApiBaseResponse<IApiGetUserQueryResponse> =
        await response.data;

      return data;
    } catch (error) {
      console.log('error : ', error);

      throw error;
    }
  }

  async updatePutUserMutation(params: {
    userId: string;
    payload: IApiUpdatePutUserMutationParams;
  }): Promise<ApiBaseResponse<IApiGetUserQueryResponse>> {
    try {
      const response = await http.put(
        `${API_ROUTES.USER}/${params.userId}`,
        params.payload,
      );

      const data: ApiBaseResponse<IApiGetUserQueryResponse> =
        await response.data;

      return data;
    } catch (error) {
      console.log(error);

      throw error;
    }
  }

  async deleteUserMutation(userId: string) {
    console.log('service user id : ', userId);
    console.log('routes name : ', API_ROUTES.USER);

    try {
      const response = await http.delete(`${API_ROUTES.USER}/${userId}`);

      const data = await response.data;
      return data;
    } catch (error) {
      console.log('error : ', error);

      throw error;
    }
  }
}

const userService = new UserServiceApi();

export default userService;
