export interface IApiAuthLoginMutation {
  email: string;
  password: string;
}

export interface IApiLoginResponse {
  token: string;
}

export interface IAuthCredentialResponse {
  id: string;
  username: string;
  password: string;
  email: string;
  firstname: string;
  lastname: string;
  role: string;
  memberId?: string;
  clientId?: string;
  member: {
    id: number;
    position: string;
    profilePicture: string;
  };
}
