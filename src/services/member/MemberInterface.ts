import { IApiGetUserQueryResponse } from '../user/UserInterface';

export interface IApiMemberMutationParams {
  userId: string;
  position: string;
  birthDate: Date;
  gender: string;
  phoneNumber: string;
}

export interface IApiMemberDetailQueryResponse {
  id: string;
  position: string;
  phoneNumber: string;
  profilePicture: string;
  gender: string;
  birthDate: string;
  userId: string;
  user: IApiGetUserQueryResponse;
}

export interface IApiMemberDetailBaseResponse {
  memberDetail: IApiMemberDetailQueryResponse;
}
