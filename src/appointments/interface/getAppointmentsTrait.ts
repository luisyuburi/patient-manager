import { Appointment, AppointmentRecord } from "../entities/appointment";

export interface GetAppointmentsTrait {
  getAppointments(): AppointmentRecord[];
}
