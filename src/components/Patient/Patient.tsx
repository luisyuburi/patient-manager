import { useState } from "react";
import Modal from "../../utilities/Modal/Modal";
import { IPatient } from "../../interfaces/App/App.interface";
import { IPatientsList } from "../../interfaces/components/PatientsList/PatientsList.interface";
import React from "react";

export interface IPatientProps {
  key?: string;
  patient: IPatient;
  setPatient: (patient: IPatient) => void;
  deletePatient: (id: IPatient["id"]) => void;
}

type Props = IPatient & IPatientsList;

const Patient: React.FC<IPatientProps> = (props) => {
  const [mostrarModal, setMostrarModal] = useState(false);

  return (
    <div className="m-3 bg-white shadow-md px-5 py-10 rounded-xl">
      {mostrarModal && (
        <Modal
          title={"¿Deseas eliminar este paciente?"}
          content={""}
          onClick={() => props.deletePatient(props.patient.id)}
          showModal={mostrarModal}
          setShowModal={setMostrarModal}
        />
      )}
      <p className="font-bold mb-3 text-gray-700 uppercase">
        Nombre: {""}
        <span className="font-normal normal-case">{props.patient.name}</span>
      </p>
      <p className="font-bold mb-3 text-gray-700 uppercase">
        Propietario: {""}
        <span className="font-normal normal-case">{props.patient.owner}</span>
      </p>{" "}
      <p className="font-bold mb-3 text-gray-700 uppercase">
        Email: {""}
        <span className="font-normal normal-case">{props.patient.email}</span>
      </p>{" "}
      <p className="font-bold mb-3 text-gray-700 uppercase">
        Fecha Alta: {""}
        <span className="font-normal normal-case">
          {props.patient.date?.toString()}
        </span>
      </p>{" "}
      <p className="font-bold mb-3 text-gray-700 uppercase">
        Sintomas: {""}
        <span className="font-normal normal-case">
          {props.patient.symptoms}
        </span>
      </p>
      <div className="flex justify-between">
        <button
          className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg transition-colors mt-10"
          type="button"
          onClick={() => props.setPatient(props.patient)}
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

export default Patient;
