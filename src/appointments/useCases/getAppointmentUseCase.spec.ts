import { AppointmentRecord } from "../entities/appointment";
import { GetAppointmentsTrait } from "../interface/getAppointmentsTrait";
import { LocalStorageRepository } from "../repositories/localStorageRepository";
import { GetAppointmentsUseCase } from "./getAppointmentUseCase";

const AppointmentMock: AppointmentRecord = {
  patient: {
    name: "Hook",
    symptoms: "Fiebre",
  },
  responsible: {
    name: "Lewis",
    email: "email@email.com",
    patients: null,
  },
  date: new Date(),
  id: "123",
};

describe("GetAppointmentUseCase", () => {
  test("return list", async () => {
    const repository: GetAppointmentsTrait = {
      getAppointments: function (): AppointmentRecord[] {
        return [AppointmentMock];
      },
    };
    const getAppointments = new GetAppointmentsUseCase(repository);
    expect(getAppointments.execute()).toEqual([AppointmentMock]);
  });
});
