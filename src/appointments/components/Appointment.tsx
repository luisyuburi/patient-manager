import { useState } from "react";
import Modal from "../../utilities/Modal/Modal";

import React from "react";
import { AppointmentRecord } from "../entities/appointment";

export interface AppointmentProps {
  appointment: AppointmentRecord;
  onEdit: (appointment: AppointmentRecord) => void;
  onDelete: (appointment: AppointmentRecord) => void;
}

const Appointment: React.FC<AppointmentProps> = (props) => {
  const [mostrarModal, setMostrarModal] = useState(false);

  return (
    <div className="m-3 bg-white shadow-md px-5 py-10 rounded-xl">
      {mostrarModal && (
        <Modal
          title={"¿Deseas eliminar este paciente?"}
          content={""}
          onClick={() => props.onDelete(props.appointment)}
          showModal={mostrarModal}
          setShowModal={setMostrarModal}
        />
      )}
      <p className="font-bold mb-3 text-gray-700 uppercase">
        Nombre: {""}
        <span className="font-normal normal-case" data-testid="patient-name">
          {props.appointment.patient.name}
        </span>
      </p>
      <p className="font-bold mb-3 text-gray-700 uppercase">
        Propietario: {""}
        <span className="font-normal normal-case">
          {props.appointment.responsible.name}
        </span>
      </p>{" "}
      <p className="font-bold mb-3 text-gray-700 uppercase">
        Email: {""}
        <span className="font-normal normal-case">
          {props.appointment.responsible.email}
        </span>
      </p>{" "}
      <p className="font-bold mb-3 text-gray-700 uppercase">
        Fecha Alta: {""}
        <span className="font-normal normal-case">
          {props.appointment.date.toString()}
        </span>
      </p>{" "}
      <p className="font-bold mb-3 text-gray-700 uppercase">
        Sintomas: {""}
        <span className="font-normal normal-case" data-testid="patient-symptoms">
          {props.appointment.patient.symptoms}
        </span>
      </p>
      <div className="flex justify-between">
        <button
          className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg transition-colors mt-10"
          type="button"
          onClick={() => props.onEdit(props.appointment)}
        >
          Editar
        </button>
        <button
          className="py-2 px-10 bg-red-700 hover:bg-red-800 text-white font-bold uppercase rounded-lg transition-colors mt-10"
          type="button"
          onClick={() => setMostrarModal(true)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default Appointment;
