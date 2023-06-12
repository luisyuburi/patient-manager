import { Appointment, AppointmentRecord } from "../entities/appointment";
export interface EditAppointmentTrait {
  editAppointment(appointment: AppointmentRecord): AppointmentRecord;
}
