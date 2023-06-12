import { Appointment, AppointmentRecord } from "../entities/appointment";

export interface DeleteAppointmentTrait {
  deleteAppointment(appointment: AppointmentRecord): boolean;
}
