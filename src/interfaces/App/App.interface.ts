export interface IPatient {
  key?: any;
  id?: string;
  name: string;
  owner: string;
  email: string;
  date: Date | null;
  symptoms: string;
}

export interface IPatients extends Array<IPatient> {}
