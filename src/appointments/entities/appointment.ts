import { Patient } from "./patient";
import { PatientResponsible } from "./patientResponsible";

export type Appointment = {
  patient: Patient;
  date: Date;
  responsible: PatientResponsible;
};

export type AppointmentRecord = Appointment & {
  id: string;
};
