import { useEffect } from "react";
import AppointmentComponent from "./Appointment";
import React from "react";
import { AppointmentRecord } from "../entities/appointment";

interface AppointmentListProps {
  appointments: AppointmentRecord[] | null;
  onDelete: (appointment: AppointmentRecord) => void;
  onEdit: (appointment: AppointmentRecord) => void;
}

const AppointmentList = (props: AppointmentListProps) => {
  return (
    <div className="md:w-1/2 lg:w-3/5 md:h-screen overflow-y-auto">
      {props.appointments !== null ? (
        <>
          <h2 className="font-black text-3xl text-center">
            Listado Pacientes{" "}
          </h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Administra tus {""}
            <span className="text-indigo-600 font-bold">Pacientes y Citas</span>
          </p>
          {props.appointments.map((appointment) => (
            <AppointmentComponent
              key={appointment.id}
              appointment={appointment}
              onEdit={props.onEdit}
              onDelete={props.onDelete}
            />
          ))}
        </>
      ) : (
        <>
          <h2 className="font-black text-3xl text-center">No hay pacientes</h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Comienza agregando pacientes {""}
            <span className="text-indigo-600 font-bold">
              y aparecerán en este lugar
            </span>
          </p>
        </>
      )}
    </div>
  );
};

export default AppointmentList;
