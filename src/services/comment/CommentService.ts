import { IPostCommentMutationParams } from './CommentInterface';
import { http } from '../../libs/http';
import { API_ROUTES } from '../../constant/api_routes';

class CommentServiceApi {
  async sendCommentMessage(payload: IPostCommentMutationParams) {
    try {
      const response = await http.post(API_ROUTES.COMMENT, payload);

      const data = await response.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getCommentByTask(taskId: number) {
    try {
      const response = await http.get(`${API_ROUTES.COMMENT}/${taskId}`);

      const data = await response.data;

      return data;
    } catch (error) {
      console.log('body : ', error);

      throw error;
    }
  }
}

const commentService = new CommentServiceApi();

export default commentService;
