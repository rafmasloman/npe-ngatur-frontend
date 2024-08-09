export interface IApiGetUserQueryResponse {
  id: string;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  role: 'STAFF' | 'ADMIN' | 'PROJECT_MANAGER';
  member?: { id: string; position: string; profilePicture?: string };
}

export interface IApiCreatePostUserMutationParams {
  email: string;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  role: string;
}

export interface IApiUpdatePutUserMutationParams {
  email: string;
  username: string;
  password?: string;
  firstname: string;
  lastname: string;
  role: string;
}

export interface IApiQueryUserNonMemberResponse {
  id: string;
  firstname: string;
  lastname: string;
}
