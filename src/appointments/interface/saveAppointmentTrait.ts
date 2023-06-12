import { Appointment, AppointmentRecord } from "../entities/appointment";
export interface SaveAppointmentTrait {
  saveAppointment(appointment: Appointment): AppointmentRecord;
}
