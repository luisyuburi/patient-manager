const Error = (props) => {
  let alertColor;
  switch (props.alertType) {
    case "success":
      alertColor = "bg-green-800 ";
      break;
    case "error":
      alertColor = "bg-red-800";
    default:
      break;
  }

  return (
    <div
      className={`${alertColor} text-white text-center p-3 uppercase font-bold mb-3 rounded-md`}
    >
      <p>{props.children}</p>
    </div>
  );
};

export default Error;
