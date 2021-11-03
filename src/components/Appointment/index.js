import React from "react";
import useVisualMode from "../../hooks/useVisualMode";
import Empty from "./Empty";
import Error from "./Error";
import "./styles.scss";

import Header from "./Header";
import Show from "./Show";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE, true));
  }
  function deleteConfirm() {
    transition(CONFIRM);
  }

  function deleteInterview() {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true));
  }
  function editInterview() {
    transition(EDIT);
  }

  return (
    <article className="appointment">
      {props.time ? <Header time={props.time} /> : <p>No Appointments</p>}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={editInterview}
          onDelete={deleteConfirm}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === CONFIRM && (
        <Confirm
          message="Delete the appointment?"
          onConfirm={deleteInterview}
          onCancel={() => back()}
        />
      )}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === ERROR_SAVE && (
        <Error message="Could not add appointment" onClose={() => back()} />
      )}
      {mode === ERROR_DELETE && (
        <Error message="Could not cancel appointment" onClose={() => back()} />
      )}
    </article>
  );
}
