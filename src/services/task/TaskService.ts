import { API_ROUTES } from '../../constant/api_routes';
import { http } from '../../libs/http';
import { IApiTaskMutationParams } from './TaskInterface';

class TaskServiceApi {
  constructor() {
    this.updateStatusTask = this.updateStatusTask.bind(this);
  }

  async getAllTask() {
    try {
      const response = await http.get(API_ROUTES.TASK);

      const data = response.data;

      return data;
    } catch (error: any) {
      console.log(error);
    }
  }

  async getTaskDetail(taskId: number) {
    try {
      const response = await http.get(`${API_ROUTES.TASK}/${taskId}`);

      const data = await response.data;
      return data;
    } catch (error: any) {
      console.log('error : ', error);

      throw error;
    }
  }

  async createTask(payload: IApiTaskMutationParams) {
    try {
      const response = await http.post(API_ROUTES.TASK, payload);

      const data = await response.data;

      return data;
    } catch (error: any) {
      throw error;
    }
  }

  async updateTask(params: {
    taskId: string;
    payload: IApiTaskMutationParams;
  }) {
    try {
      const response = await http.put(
        `${API_ROUTES.TASK}/${params.taskId}`,
        params.payload,
      );

      const data = await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async updateStatusTask(params: { id: number; status: any }) {
    console.log('params : ', params);

    try {
      const response = await http.put(
        `${API_ROUTES.TASK}/status/${params.id}`,
        { status: params.status },
      );

      const data = await response.data;

      console.log('data service : ', data);

      return data;
    } catch (error) {
      console.log(error);

      throw error;
    }
  }

  async deleteTask(taskId: string) {
    try {
      const response = await http.delete(`${API_ROUTES.TASK}/${taskId}`);

      const data = await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }
}

const taskService = new TaskServiceApi();

export default taskService;
