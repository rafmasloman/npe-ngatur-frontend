import { API_ROUTES } from '../../constant/api_routes';
import { http } from '../../libs/http';
import { IApiMilestonePayloadMutation } from './MilestoneInterface';

class MilestonService {
  private routesName = `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/${API_ROUTES.MILESTONE}`;

  constructor() {
    this.createMilestone = this.createMilestone.bind(this);
    this.updateMilestone = this.updateMilestone.bind(this);
    this.updateStatusMilestone = this.updateStatusMilestone.bind(this);
    this.deleteMilestone = this.deleteMilestone.bind(this);
  }

  async getAllMilestone() {
    try {
      const response = await http.get(API_ROUTES.MILESTONE);

      const data = await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getDetailMilestone(milestoneId: string) {
    try {
      const response = await http.get(`${API_ROUTES.MILESTONE}/${milestoneId}`);

      const data = await response.data;

      return data;
    } catch (error) {
      console.log(error);

      throw error;
    }
  }

  async getMilestoneDeadline(milestoneId?: string) {
    try {
      const response = await http.get(
        `${API_ROUTES.MILESTONE}/deadline/${milestoneId}`,
      );

      const data = await response.data;

      return data;
    } catch (error) {
      console.log(error);

      throw error;
    }
  }

  async getMilestonesByProject(projectId: string) {
    try {
      const response = await http.get(
        `${API_ROUTES.MILESTONE}/project/${projectId}`,
      );

      const data = await response.data;

      return data;
    } catch (error) {
      console.log(error);

      throw error;
    }
  }

  async createMilestone(payload: IApiMilestonePayloadMutation) {
    try {
      const response = await http.post(API_ROUTES.MILESTONE, payload);

      const data = await response.data;

      return data;
    } catch (error) {
      console.log(error);

      throw error;
    }
  }

  async updateMilestone(params: {
    milestoneId: string;
    payload: IApiMilestonePayloadMutation;
  }) {
    try {
      const response = await http.put(
        `${API_ROUTES.MILESTONE}/${params.milestoneId}`,
        params.payload,
      );

      const data = await response.data;

      return data;
    } catch (error) {
      console.log(error);

      throw error;
    }
  }

  async updateStatusMilestone(
    milestoneId: string,
    payload: { status: string },
  ) {
    try {
      const response = await http.put(
        `${API_ROUTES.MILESTONE}/status/${milestoneId}`,
        payload,
      );

      const data = await response.data;
      console.log(data);

      return data;
    } catch (error) {
      console.log(error);

      throw error;
    }
  }

  async deleteMilestone(milestoneId?: string) {
    try {
      const response = await http.delete(
        `${API_ROUTES.MILESTONE}/${milestoneId}`,
      );

      const data = await response.data;
      console.log(data);

      return data;
    } catch (error) {
      console.log(error);

      throw error;
    }
  }
}

const milestoneServiceApi = new MilestonService();

export default milestoneServiceApi;
