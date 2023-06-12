import { Appointment, AppointmentRecord } from "../entities/appointment";
import { SaveAppointmentTrait } from "../interface/saveAppointmentTrait";
import { GetAppointmentsTrait } from "../interface/getAppointmentsTrait";
import { DeleteAppointmentTrait } from "../interface/deleteAppointmentTrait";
import { GenerarID } from "../../utilities/GenerateID/GenerateID";
import { EditAppointmentTrait } from "../interface/editAppointmentTrait";
export abstract class LocalStorageRepository
  implements
    SaveAppointmentTrait,
    GetAppointmentsTrait,
    DeleteAppointmentTrait,
    EditAppointmentTrait
{
  abstract editAppointment(appointment: AppointmentRecord): AppointmentRecord;
  abstract deleteAppointment(appointment: AppointmentRecord): boolean;
  abstract getAppointments(): AppointmentRecord[];
  abstract saveAppointment(appointment: Appointment): AppointmentRecord;
}

export class defaultLocalStorageRepository implements LocalStorageRepository {

  editAppointment(appointment: AppointmentRecord): AppointmentRecord {
    const localStoraRecords: AppointmentRecord[] = JSON.parse(
      localStorage.getItem("appointments") ?? "[]"
    );
    const recordIndex = localStoraRecords.findIndex(
      (record) => record.id === appointment.id
    );
    if (recordIndex < 0) {
      throw new Error("No se encontro el registro");
    }
    localStoraRecords[recordIndex] = {
      ...localStoraRecords[recordIndex],
      ...appointment,
    };
    localStorage.setItem("appointments", JSON.stringify(localStoraRecords));
    return localStoraRecords[recordIndex];
  }
  
  deleteAppointment(appointment: AppointmentRecord): boolean {
    const localStoraRecords: AppointmentRecord[] = JSON.parse(
      localStorage.getItem("appointments") ?? "[]"
    );

   const filteredAppointments = localStoraRecords.filter(
      (appointmentRecord) => appointmentRecord.id !== appointment.id
    );
    localStorage.setItem("appointments", JSON.stringify(filteredAppointments));
    return true;
  }
  getAppointments(): AppointmentRecord[] {
    const localStoraRecords: AppointmentRecord[] = JSON.parse(
      localStorage.getItem("appointments") ?? "[]"
    );

    return localStoraRecords;
  }
  saveAppointment(appointment: Appointment): AppointmentRecord {
    const appointmentRecord: AppointmentRecord = {
      id: GenerarID(),
      ...appointment,
    };
    const localStoraRecords: AppointmentRecord[] = JSON.parse(
      localStorage.getItem("appointments") ?? "[]"
    );

    localStoraRecords.push(appointmentRecord);
    localStorage.setItem("appointments", JSON.stringify(localStoraRecords));

    return appointmentRecord;
  }
}
