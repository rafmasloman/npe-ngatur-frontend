import { API_ROUTES } from '../../constant/api_routes';
import { http } from '../../libs/http';
import { ApiBaseResponse } from '../../utils/api/base_response';
import {
  IInviteMemberToProjectParams,
  IProjectDetailResponseApi,
  IProjectResponseApi,
} from './ProjectsInterface';

class ProjectServiceApi {
  private routesName = `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/${API_ROUTES.PROJECT}`;

  constructor() {
    this.createProject = this.createProject.bind(this);
    this.updateProject = this.updateProject.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
    this.deleteMemberFromProject = this.deleteMemberFromProject.bind(this);
    this.inviteMemberToProject = this.inviteMemberToProject.bind(this);
  }

  async getAllProjects(
    limit?: number,
    projectName?: string,
  ): Promise<ApiBaseResponse<IProjectResponseApi[]>> {
    try {
      console.log('project name : ', projectName);

      const response = await http.get(
        `${API_ROUTES.PROJECT}/?projectName=${!projectName ? '' : projectName}`,
      );

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
      const response = await http.get(`${API_ROUTES.PROJECT}/${projectId}`);

      const data: ApiBaseResponse<IProjectDetailResponseApi> =
        await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getProjectTeamMember(projectId: string) {
    try {
      const response = await http.get(
        `${API_ROUTES.PROJECT}/teams/${projectId}`,
      );

      const data = await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async createProject(payload: FormData) {
    try {
      const response = await http.post(API_ROUTES.PROJECT, payload);

      const data = await response.data;
      return data;
    } catch (error: any) {
      console.log('error : ', error);

      return error;
    }
  }

  async updateProject(payload: { projectId: string; params: FormData }) {
    try {
      const response = await http.put(
        `${API_ROUTES.PROJECT}/${payload.projectId}`,
        payload.params,
      );

      const data = await response.data;
      return data;
    } catch (error) {
      return error;
    }
  }

  async deleteProject(projectId: string) {
    try {
      const response = await http.delete(`${API_ROUTES.PROJECT}/${projectId}`);

      const data = await response.data;
      return data;
    } catch (error) {
      return error;
    }
  }

  async inviteMemberToProject(payload: IInviteMemberToProjectParams) {
    try {
      const response = await http.post(
        `${API_ROUTES.PROJECT}/inviteMember`,
        payload,
      );

      const data = await response.data;
      return data;
    } catch (error: any) {
      console.log('error : ', error);

      return error;
    }
  }

  async deleteMemberFromProject(payload: {
    memberId: string;
    projectId: string;
  }) {
    try {
      const response = await http.delete(
        `${API_ROUTES.PROJECT}/removeMember/${payload.projectId}/${payload.memberId}`,
      );

      const data = await response.data;
      return data;
    } catch (error: any) {
      console.log('error : ', error);

      throw error;
    }
  }
}

const projectService = new ProjectServiceApi();

export default projectService;
