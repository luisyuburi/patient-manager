import { Appointment, AppointmentRecord } from "../entities/appointment";
import { DeleteAppointmentTrait } from "../interface/deleteAppointmentTrait";
import { EditAppointmentTrait } from "../interface/editAppointmentTrait";

export class DeleteAppointmentUseCase {
  constructor(private readonly repository: DeleteAppointmentTrait) {}
  execute(appointment: AppointmentRecord) {
    return this.repository.deleteAppointment(appointment);
  }
}
