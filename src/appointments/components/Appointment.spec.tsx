import { render } from "@testing-library/react";
import React from "react";

import Appointment, { AppointmentProps } from "./Appointment";
import { AppointmentRecord } from "../entities/appointment";

const AppointmentMock: AppointmentRecord = {
  patient: {
    name: "Hook",
    symptoms: "Fiebre",
  },
  responsible: {
    name: "Lewis",
    email: "email@email.com",
    patients: null,
  },
  date: new Date(),
  id: "123",
};
describe("<Appointment />", () => {
  function renderAppointment(props: Partial<AppointmentProps> = {}) {
    const defaultProps: AppointmentProps = {
      appointment: {
        ...AppointmentMock,
        patient: { name: "Dino", symptoms: "Allergy" },
      },
      onEdit: function (appointment: AppointmentRecord): void {
        throw new Error("Function not implemented.");
      },
      onDelete: function (appointment: AppointmentRecord): void {
        throw new Error("Function not implemented.");
      },
    };
    return render(<Appointment {...defaultProps} {...props} />);
  }
  test("loads and display patient name correctly", async () => {
    const { findByTestId } = renderAppointment();

    const patientNameContainer = await findByTestId("patient-name");
    const patientSymptoms = await findByTestId("patient-symptoms")

    expect(patientNameContainer).toHaveTextContent("Dino");
    expect(patientSymptoms).toHaveTextContent("Allergy");

  });
});
