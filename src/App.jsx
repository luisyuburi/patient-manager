import { useEffect, useState } from "react";

import Formulario from "./components/Formulario/Formulario";
import Header from "./components/Header/Header";
import ListadoPacientes from "./components/ListadoPacientes/ListadoPacientes";
function App() {
  const [pacientes, setPacientes] = useState(
    JSON.parse(localStorage.getItem("pacientes") ?? [])
  );
  const [paciente, setPaciente] = useState({});

  useEffect(() => {
    localStorage.setItem("pacientes", JSON.stringify(pacientes));
  }, [pacientes]);

  const eliminarPaciente = (id) => {
    const pacientesActualizados = pacientes.filter(
      (element) => element.id !== id
    );
    setPacientes(pacientesActualizados);
  };

  return (
    <div className="container mx-auto mt-20">
      <Header />

      <div className="mt-12 md:flex">
        <Formulario
          paciente={paciente}
          setPaciente={setPaciente}
          pacientes={pacientes}
          setPacientes={setPacientes}
        />
        <ListadoPacientes
          eliminarPaciente={eliminarPaciente}
          pacientes={pacientes}
          setPaciente={setPaciente}
        />
      </div>
    </div>
  );
}

export default App;
