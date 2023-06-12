import { Patient } from "./patient";
export type PatientResponsible = {
  name: string;
  email: string;
  patients: Patient[] | null;
};
