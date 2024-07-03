import { API_ROUTES } from '../../constant/api_routes';
import { http } from '../../libs/http';

interface IMilestonePayload {
  milestoneName: string;
  projectId: string;
  startedDate: string;
  endDate: string;
}

class MilestonService {
  private routesName = `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/${API_ROUTES.MILESTONE}`;

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
      const response = await http.get(`${this.routesName}/${milestoneId}`);

      const data = await response.data;

      return data;
    } catch (error) {
      console.log(error);

      throw error;
    }
  }

  //    async getMilestoneDeadline(milestoneId?: string) {
  //     try {
  //       const response = await fetch(
  //         `${this.routesName}/deadline/${milestoneId}`,
  //         {
  //           method: 'GET',
  //           headers: {
  //             'Content-type': 'application/json',
  //             Authorization: `Bearer ${
  //               __getBrowserAuthCookie(TOKEN_NAME) || __getSSRAuthCookie()
  //             }`,
  //           },
  //         },
  //       );

  //       const data = await response.json();

  //       return data;
  //     } catch (error) {
  //       console.log(error);

  //       throw error;
  //     }
  //   }

  async getMilestonesByProject(projectId: string) {
    try {
      const response = await http.get(
        `${this.routesName}/project/${projectId}`,
      );

      const data = await response.data;

      return data;
    } catch (error) {
      console.log(error);

      throw error;
    }
  }

  async createMilestone(payload: IMilestonePayload) {
    try {
      const response = await http.post(this.routesName, payload);

      const data = await response.data;

      return data;
    } catch (error) {
      console.log(error);

      throw error;
    }
  }

  async updateMilestone(milestoneId: string, payload: IMilestonePayload) {
    try {
      const response = await http.put(
        `${this.routesName}/${milestoneId}`,
        payload,
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
        `${this.routesName}/status/${milestoneId}`,
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
      const response = await http.delete(`${this.routesName}/${milestoneId}`);

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
