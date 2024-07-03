export interface ApiBaseResponse<T> {
  message: string;
  statusCode: number;
  data: T;
}
