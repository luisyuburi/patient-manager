import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IPatient, IPatients } from "./interfaces/App/App.interface";
import Form from "./components/Form/Form";
import Header from "./components/Header/Header";
import PatientsList from "./components/PatientsList/PatientsList";
function App() {
  const [patients, setPatients] = useState<IPatients | []>(
    JSON.parse(localStorage.getItem("patients") || "[]")
  );
  const [patient, setPatient] = useState<IPatient>({
    name: "",
    owner: "",
    email: "",
    date: null,
    symptoms: "",
  });

  useEffect(() => {
    localStorage.setItem("patients", JSON.stringify(patients));
  }, [patients]);

  const deletePatient = (id: IPatient["id"]) => {
    // En caso de que queramos deshacer la acción mas adelante
    // const pacienteEliminado = patients.find((element) => element.id === id);

    toast.success(`¡Cita eliminada exitosamente!`);
    const pacientesActualizados = patients.filter(
      (element) => element.id !== id
    );
    setPatients(pacientesActualizados);
  };

  return (
    <div className="container mx-auto mt-20">
      <Header />

      <div className="mt-12 md:flex">
        <Form
          patient={patient}
          setPatient={setPatient}
          patients={patients}
          setPatients={setPatients}
        />
        <PatientsList
          deletePatient={deletePatient}
          patients={patients}
          setPatient={setPatient}
        />
      </div>
    </div>
  );
}

export default App;
