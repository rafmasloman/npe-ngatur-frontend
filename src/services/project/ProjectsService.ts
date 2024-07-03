import { API_ROUTES } from '../../constant/api_routes';
import { http } from '../../libs/http';
import { ApiBaseResponse } from '../../utils/api/base_response';
import {
  IProjectDetailResponseApi,
  IProjectResponseApi,
} from './ProjectsInterface';

class ProjectServiceApi {
  private routesName = `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/${API_ROUTES.PROJECT}`;

  async getAllProjects(): Promise<ApiBaseResponse<IProjectResponseApi[]>> {
    try {
      const response = await http.get(`${this.routesName}`);

      const data: ApiBaseResponse<IProjectResponseApi[]> = await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getDetailProject(
    projectId: string,
  ): Promise<ApiBaseResponse<IProjectDetailResponseApi>> {
    try {
      const response = await http.get(`${this.routesName}/${projectId}`);

      const data: ApiBaseResponse<IProjectDetailResponseApi> =
        await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getProjectTeamMember(projectId: string) {
    try {
      const response = await http.get(`${this.routesName}/teams/${projectId}`);

      const data = await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }
}

const projectService = new ProjectServiceApi();

export default projectService;
