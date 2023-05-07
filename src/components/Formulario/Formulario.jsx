import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Alert from "../Alert/Alert";
const Formulario = (props) => {
  const [nombre, setNombre] = useState("");
  const [propietario, setPropietario] = useState("");
  const [email, setEmail] = useState("");
  const [fecha, setFecha] = useState("");
  const [sintomas, setSintomas] = useState("");

  useEffect(() => {
    if (Object.keys(props.paciente).length > 0) {
      setNombre(props.paciente.nombre);
      setPropietario(props.paciente.propietario);
      setEmail(props.paciente.email);
      setSintomas(props.paciente.sintomas);
      setFecha(props.paciente.fecha);
    }
  }, [props.paciente]);

  const generarId = () => {
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString(36);

    return random + fecha;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validacion del formulario
    if ([nombre, propietario, email, fecha, sintomas].includes("")) {
      toast.error("Todos los campos son obligatorios");
      return;
    }

    // Objeto de paciente

    const objetoPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas,
    };

    if (props.paciente.id) {
      // Editando el registro
      objetoPaciente.id = props.paciente.id;

      const pacientesActualizados = props.pacientes.map((element) =>
        element.id === props.paciente.id ? objetoPaciente : element
      );
      props.setPacientes(pacientesActualizados);
      props.setPaciente({});
    } else {
      // Nuevo registro
      objetoPaciente.id = generarId();
      console.log("objetoPaciente", objetoPaciente);
      console.log("props.pacientes desde Formulario.jsx", props.pacientes);
      props.setPacientes([...props.pacientes, objetoPaciente]);
      toast.success("Cita creada exitosamente!");
      console.log("pacientes", pacientes);
    }

    // Reiniciar el formulario
    setNombre("");
    setEmail("");
    setFecha("");
    setPropietario("");
    setSintomas("");
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
            Nombre Mascota {nombre}
          </label>
          <input
            id="mascota"
            type="text"
            placeholder="Nombre de la Mascota"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="propietario"
            className="block text-gray-700 uppercase font-bold"
          >
            Nompre Propietario
          </label>
          <input
            id="propietario"
            type="text"
            placeholder="Nombre del Propietario"
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
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
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="sintomas"
            className="block text-gray-700 uppercase font-bold"
          >
            Sintomas{" "}
          </label>
          <textarea
            id="sintomas"
            placeholder="Describe los Síntomas"
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          />
        </div>
        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
          value={props.paciente.id ? "Editar Paciente" : "Agregar Paciente"}
        />
      </form>
    </div>
  );
};

export default Formulario;
