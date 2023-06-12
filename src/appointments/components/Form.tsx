import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IPatient } from "../../interfaces/App/App.interface";
import { GenerarID } from "../../utilities/GenerateID/GenerateID";
import { Appointment, AppointmentRecord } from "../entities/appointment";

interface FormProps {
  selectedAppointment: AppointmentRecord | null;
  onCancel: () => void;
  onSave: (appointment: Appointment) => void;
  onEdit: (appointment: AppointmentRecord) => void;
}

const Form = (props: FormProps) => {
  const [name, setName] = useState<Appointment["patient"]["name"]>("");
  const [responsible, setResponsible] =
    useState<Appointment["responsible"]["name"]>("");
  const [email, setEmail] = useState<Appointment["responsible"]["email"]>("");
  const [date, setDate] = useState<Appointment["date"]>(new Date());
  const [symptoms, setSymptoms] =
    useState<Appointment["patient"]["symptoms"]>("");

  useEffect(() => {
    if (props.selectedAppointment !== null) {
      setName(props.selectedAppointment.patient.name);
      setResponsible(props.selectedAppointment.responsible.name);
      setEmail(props.selectedAppointment.responsible.email);
      setSymptoms(props.selectedAppointment.patient.symptoms);
      setDate(props.selectedAppointment.date);
    }
  }, [props.selectedAppointment]);

  const onCancelEdit = () => {
    props.onCancel();
    formReset();
  };

  // Reiniciar el formulario
  const formReset = () => {
    setName("");
    setEmail("");
    setDate(new Date());
    setResponsible("");
    setSymptoms("");
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    // Validacion del formulario
    if ([name, responsible, email, date, symptoms].includes("")) {
      toast.error("¡Todos los campos son obligatorios!");
      return;
    }
    if (props.selectedAppointment === null) {
      const newAppointment: Appointment = {
        patient: {
          name,
          symptoms,
        },
        responsible: {
          name: responsible,
          email,
          patients: null,
        },
        date,
      };
      props.onSave(newAppointment);
    } else {
      const newAppointment: AppointmentRecord = {
        patient: {
          name,
          symptoms,
        },
        responsible: {
          name: responsible,
          email,
          patients: null,
        },
        date,
        id: props.selectedAppointment.id,
      };
      props.onEdit(newAppointment);
      formReset();
    }
  };

  return (
    <div className="md:w-1/2 lg:w-2/5">
      <Toaster />

      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
      <p className="text-lg mt-5 text-center mb-10">
        Añade Pacientes y {""}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
      >
        {/* {showAlert && <Alert alertType={alertType}>{alertMessage}</Alert>} */}
        <div className="mb-5">
          <label
            htmlFor="mascota"
            className="block text-gray-700 uppercase font-bold"
          >
            Nombre Mascota {name}
          </label>
          <input
            id="mascota"
            type="text"
            placeholder="Nombre de la Mascota"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="responsible"
            className="block text-gray-700 uppercase font-bold"
          >
            Nompre Propietario
          </label>
          <input
            id="responsible"
            type="text"
            placeholder="Nombre del Propietario"
            value={responsible}
            onChange={(e) => setResponsible(e.target.value)}
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block text-gray-700 uppercase font-bold"
          >
            Email{" "}
          </label>
          <input
            id="email"
            type="email"
            placeholder="ej: username@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="alta"
            className="block text-gray-700 uppercase font-bold"
          >
            Alta{" "}
          </label>
          <input
            id="alta"
            type="date"
            value={date?.toString()}
            onChange={(e: any) => setDate(e.target.value)}
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="symptoms"
            className="block text-gray-700 uppercase font-bold"
          >
            Sintomas{" "}
          </label>
          <textarea
            id="symptoms"
            placeholder="Describe los Síntomas"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          />
        </div>
        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
          value={
            props.selectedAppointment !== null
              ? "Guardar cambios"
              : "Agregar Cita"
          }
        />
        {props.selectedAppointment !== null && (
          <input
            onClick={onCancelEdit}
            className="bg-red-700 w-full p-3 text-white uppercase font-bold hover:bg-red-800 cursor-pointer transition-colors mt-1 text-center"
            value={"Cancelar"}
          />
        )}
      </form>
    </div>
  );
};

export default Form;
