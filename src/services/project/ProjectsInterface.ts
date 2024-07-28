export interface IProjectResponseApi {
  id: string;
  projectName: string;
  description: string;
  startedDate: string;
  endDate: string;
  price: number;
  image: string;
  projectIcon: string;
  platform: string;
  currentPayroll: number;
  member: any[];
  task: any[];
}

export interface IProjectDetailResponseApi {
  project: {
    id: string;
    projectName: string;
    description: string;
    startedDate: string;
    client: {
      id: string;
      address: string;
      name: string;
      phoneNumber: string;
    };
    endDate: string;
    price: number;
    image: string;
    projectIcon: string;
    platform: string;
    currentPayroll: number;
    progress: number;
    member: any[];
    task: any[];
  };
  todos?: IProjectTodoWorkspaceData;
}

export interface IProjectTodoWorkspaceData {
  todo: ITodosTaskResponse[];
  onprogress: ITodosTaskResponse[];
  completed: ITodosTaskResponse[];
}

export interface IInviteMemberToProjectParams {
  projectId: string;
  member: string;
}

export interface ITodosTaskResponse {
  comment: [];
  createdAt: string;
  endDate: string;
  id: 2;
  member: any[];
  milestone: null;
  milestoneId: null;
  name: string;
  priority: string;
  projectId: string;
  status: string;
  updatedAt: string;
}
