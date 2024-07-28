export interface IApiClientMutationParams {
  name: string;
  phoneNumber: string;
  address: string;
  email: string;
}

export interface IClientDetailResponse {
  id: string;
  name: string;
  phoneNumber: string;
  address: string;
  email: string;
  projectId: string;
  project: {
    id: string;
    projectName: string;
  };
}
