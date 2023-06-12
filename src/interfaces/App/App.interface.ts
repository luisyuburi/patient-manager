export interface IPatient {
  key?: any;
  id?: string;
  name: string;
  owner: string;
  email: string;
  date: Date | null;
  symptoms: string;
}

export type IPatients = Array<IPatient>;
