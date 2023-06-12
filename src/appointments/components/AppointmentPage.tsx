import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLocalStorage } from "react-use";
import toast, { Toaster } from "react-hot-toast";
import Header from "../../components/Header/Header";
import Form from "./Form";
import AppointmentList from "./AppointmentList";
import { GetAppointmentsUseCase } from "../useCases/getAppointmentUseCase";
import { defaultLocalStorageRepository } from "../repositories/localStorageRepository";
import { Appointment, AppointmentRecord } from "../entities/appointment";
import { SaveAppointmentUseCase } from "../useCases/saveAppointmentUseCase";
import { EditAppointmentUseCase } from "../useCases/editAppointmentUseCase";
import { DeleteAppointmentUseCase } from "../useCases/deleteAppointmentUseCase";

const AppointmentPage = () => {
  const [appointmentList, setAppointmentList] = useState<
    AppointmentRecord[] | null
  >(null);
  const [selectedAppointment, setSelectedAppointment] =
    useState<AppointmentRecord | null>(null);

  const getAppointmentList = useCallback(() => {
    const repository = new defaultLocalStorageRepository();
    const getAppointmentList = new GetAppointmentsUseCase(repository);

    const appointments = getAppointmentList.execute();
    setAppointmentList(appointments);
  }, []);

  const deleteAppointment = (appointment: AppointmentRecord) => {
    const repository = new defaultLocalStorageRepository();
    const deleteAppointment = new DeleteAppointmentUseCase(repository);
    deleteAppointment.execute(appointment);
    getAppointmentList();
  };

  const editAppointment = (appointment: AppointmentRecord) => {
    setSelectedAppointment(appointment);
  };

  const onCancel = () => {
    setSelectedAppointment(null);
  };

  const onSave = (appointment: Appointment) => {
    const repository = new defaultLocalStorageRepository();
    const saveAppointment = new SaveAppointmentUseCase(repository);
    saveAppointment.execute(appointment);
    getAppointmentList();
  };

  const onEdit = (appointment: AppointmentRecord) => {
    const repository = new defaultLocalStorageRepository();
    const editAppointment = new EditAppointmentUseCase(repository);
    editAppointment.execute(appointment);
    getAppointmentList();
  };

  useEffect(() => {
    getAppointmentList();
  }, []);

  return (
    <div className="container mx-auto mt-20">
      <Header />

      <div className="mt-12 md:flex">
        <Form
          selectedAppointment={selectedAppointment}
          onCancel={onCancel}
          onSave={onSave}
          onEdit={onEdit}
        />
        <AppointmentList
          onDelete={deleteAppointment}
          appointments={appointmentList}
          onEdit={editAppointment}
        />
      </div>
    </div>
  );
};

export default AppointmentPage;
