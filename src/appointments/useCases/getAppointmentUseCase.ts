import { Appointment } from "../entities/appointment";
import { GetAppointmentsTrait } from "../interface/getAppointmentsTrait";

export class GetAppointmentsUseCase {
  constructor(private readonly repository: GetAppointmentsTrait) {}
  execute() {
    return this.repository.getAppointments();
  }
}
