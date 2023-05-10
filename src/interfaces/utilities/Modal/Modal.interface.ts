import { Dispatch, SetStateAction } from "react";
import { IPatientsList } from "../../components/PatientsList/PatientsList.interface";
type UseState<S> = (action: S | ((prevState: S) => S)) => void;

export interface IModal {
  title: string;
  content?: string;
  onClick: () => void;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<IModal["showModal"]>>;
}
