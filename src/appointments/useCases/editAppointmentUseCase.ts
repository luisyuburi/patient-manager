import { Appointment, AppointmentRecord } from "../entities/appointment";
import { EditAppointmentTrait } from "../interface/editAppointmentTrait";

export class EditAppointmentUseCase {
  constructor(private readonly repository: EditAppointmentTrait) {}
  execute(appointment: AppointmentRecord) {
    return this.repository.editAppointment(appointment);
  }
}
