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
