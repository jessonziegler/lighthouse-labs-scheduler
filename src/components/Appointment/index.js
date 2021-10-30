import React from "react";
import "./styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";

export default function Appointment(props) {
  const appointmentText = props.time
    ? `Appointment at ${props.time}`
    : "No Appointments";

  return <article className="appointment">{appointmentText}</article>;
}
