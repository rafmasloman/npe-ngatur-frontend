import { API_ROUTES } from '../../constant/api_routes';
import { http } from '../../libs/http';
import { ApiBaseResponse } from '../../utils/api/base_response';
import {
  IApiClientMutationParams,
  IClientDetailResponse,
} from './ClientInterface';

class ClientServiceApi {
  constructor() {
    this.createClient = this.createClient.bind(this);
    this.deleteClient = this.deleteClient.bind(this);
    this.updateClient = this.updateClient.bind(this);
  }

  async getAllClients(): Promise<ApiBaseResponse<IClientDetailResponse[]>> {
    try {
      const response = await http.get(`${API_ROUTES.CLIENT}`);

      const data: ApiBaseResponse<IClientDetailResponse[]> =
        await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getClientDetail(
    clientId: string,
  ): Promise<ApiBaseResponse<IClientDetailResponse>> {
    try {
      const response = await http.get(`${API_ROUTES.CLIENT}/${clientId}`);

      const data: ApiBaseResponse<IClientDetailResponse> = await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async createClient(
    payload: IApiClientMutationParams,
  ): Promise<ApiBaseResponse<IClientDetailResponse>> {
    try {
      const response = await http.post(API_ROUTES.CLIENT, payload);

      console.log(response);

      const data: ApiBaseResponse<IClientDetailResponse> = await response.data;
      return data;
    } catch (error: any) {
      console.log('error : ', error);

      throw error;
    }
  }

  async updateClient(params: {
    clientId: string;
    payload: IApiClientMutationParams;
  }): Promise<ApiBaseResponse<IClientDetailResponse>> {
    try {
      const response = await http.put(
        `${API_ROUTES.CLIENT}/${params.clientId}`,
        params.payload,
      );

      const data: ApiBaseResponse<IClientDetailResponse> = await response.data;
      return data;
    } catch (error) {
      console.log('error : ', error);

      throw error;
    }
  }

  async deleteClient(clientId: string) {
    try {
      const response = await http.delete(`${API_ROUTES.CLIENT}/${clientId}`);

      const data = await response.data;
      return data;
    } catch (error) {
      console.log(error);

      throw error;
    }
  }
}

const clientService = new ClientServiceApi();

export default clientService;
