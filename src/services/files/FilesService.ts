import axios from 'axios';
import { API_ROUTES } from '../../constant/api_routes';
import { http } from '../../libs/http';
import { IFileParamsDataType } from './FilesInterface';

class FilesServiceApi {
  async downloadFile(params?: IFileParamsDataType) {
    try {
      const response = await http.get(
        `${API_ROUTES.FILES}/${params?.fileFolder}/${params?.fileName}`,
        {
          responseType: 'blob',
        },
      );

      const data = await response.data;
      console.log('response : ', URL.createObjectURL(data));

      return data;
    } catch (error) {
      console.log('response : ', error);

      throw error;
    }
  }
}

const filesService = new FilesServiceApi();

export default filesService;
