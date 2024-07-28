import { API_ROUTES } from '../../constant/api_routes';
import { http } from '../../libs/http';
import { ApiBaseResponse } from '../../utils/api/base_response';
import {
  IApiMemberDetailQueryResponse,
  IApiMemberMutationParams,
} from './MemberInterface';

class MemberServiceApi {
  constructor() {
    this.createMember = this.createMember.bind(this);
    this.deleteMember = this.deleteMember.bind(this);
    this.updateMember = this.updateMember.bind(this);
  }

  async getAllMembers(
    limit?: number,
  ): Promise<ApiBaseResponse<IApiMemberDetailQueryResponse[]>> {
    try {
      const response = await http.get(`${API_ROUTES.MEMBER}?limit=${limit}`);

      const data: ApiBaseResponse<IApiMemberDetailQueryResponse[]> =
        await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getMemberProjectManager() {
    try {
      const response = await http.get(`${API_ROUTES.MEMBER}/project-manager`);

      const data = await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getAllMemberProject(userId?: string) {
    try {
      const response = await http.get(`${API_ROUTES.PROJECT}/member/${userId}`);

      const data = await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getMemberDetail(
    memberId: string,
  ): Promise<ApiBaseResponse<IApiMemberDetailQueryResponse>> {
    try {
      const response = await http.get(`${API_ROUTES.MEMBER}/${memberId}`);

      const data: ApiBaseResponse<IApiMemberDetailQueryResponse> =
        await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async createMember(payload: IApiMemberMutationParams) {
    try {
      const response = await http.post(`${API_ROUTES.MEMBER}`, payload);

      const data = await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async updateMember(params: {
    payload: IApiMemberMutationParams;
    memberId: string;
  }) {
    try {
      const response = await http.put(
        `${API_ROUTES.MEMBER}/${params.memberId}`,
        params.payload,
      );

      const data = await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async deleteMember(memberId: string) {
    try {
      const response = await http.delete(`${API_ROUTES.MEMBER}/${memberId}`);

      const data = await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }
}

const memberService = new MemberServiceApi();

export default memberService;
