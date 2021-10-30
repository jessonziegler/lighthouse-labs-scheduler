import React from "react";
import classNames from "classnames";
import "./styles.scss";

export default function Appointment(props) {
  const appointmentText = props.time
    ? `Appointment at ${props.time}`
    : "No Appointments";

  return <article className="appointment">{appointmentText}</article>;
}
