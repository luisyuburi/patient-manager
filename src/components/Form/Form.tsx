import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IPatient } from "../../interfaces/App/App.interface";
import { GenerarID } from "../../utilities/GenerateID/GenerateID";
const Form = (props: any) => {
  const [name, setName] = useState<IPatient["name"]>("");
  const [owner, setOwner] = useState<IPatient["owner"]>("");
  const [email, setEmail] = useState<IPatient["email"]>("");
  const [date, setDate] = useState<IPatient["date"]>(null);
  const [symptoms, setSymptoms] = useState<IPatient["symptoms"]>("");

  useEffect(() => {
    if (Object.keys(props.patient).length > 0) {
      setName(props.patient.name);
      setOwner(props.patient.owner);
      setEmail(props.patient.email);
      setSymptoms(props.patient.symptoms);
      setDate(props.patient.date);
    }
  }, [props.patient]);

  const onCancelEdit = () => {
    props.setPatient({});
    formReset();
  };

  // Reiniciar el formulario
  const formReset = () => {
    setName("");
    setEmail("");
    setDate(null);
    setOwner("");
    setSymptoms("");
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    // Objeto de patient
    const objetoPaciente: IPatient = {
      name,
      owner,
      email,
      date,
      symptoms,
    };

    // Validacion del formulario
    if ([name, owner, email, date, symptoms].includes("")) {
      toast.error("¡Todos los campos son obligatorios!");
      return;
    }

    if (props.patient.id) {
      // Editando el registro
      objetoPaciente.id = props.patient.id;

      const pacientesActualizados = props.patients.map((element: IPatient) =>
        element.id === props.patient.id ? objetoPaciente : element
      );
      props.setPatients(pacientesActualizados);
      props.setPatient({});
      toast.success("Cita editada exitosamente!");
    } else {
      // Nuevo registro
      objetoPaciente.id = GenerarID();
      if (!props.patients) props.setPatients([]);
      props.setPatients([...props.patients, objetoPaciente]);
      toast.success("Cita agregada exitosamente!");
    }
    formReset();
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
            htmlFor="owner"
            className="block text-gray-700 uppercase font-bold"
          >
            Nompre Propietario
          </label>
          <input
            id="owner"
            type="text"
            placeholder="Nombre del Propietario"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
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
          value={props.patient.id ? "Guardar cambios" : "Agregar Cita"}
        />
        {props.patient.id && (
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
