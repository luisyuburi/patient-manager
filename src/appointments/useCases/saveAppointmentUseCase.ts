import { Appointment } from "../entities/appointment";
import { SaveAppointmentTrait } from "../interface/saveAppointmentTrait";

export class SaveAppointmentUseCase {
  constructor(private readonly repository: SaveAppointmentTrait) {}
  execute(appointment: Appointment) {
    return this.repository.saveAppointment(appointment);
  }
}
