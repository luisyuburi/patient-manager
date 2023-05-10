import { IPatients, IPatient } from "../../App/App.interface";

export interface IPatientsList {
  deletePatient: (id: IPatient["id"]) => void;
  patients: IPatients;
  setPatient: (patient: IPatient) => void;
  patient?: IPatient
}
