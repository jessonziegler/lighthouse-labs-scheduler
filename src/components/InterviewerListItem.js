import React from "react";
import "./InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {
  const selectedInterviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });
  let name = "";
  if (props.selected) {
    name = props.name;
  } else {
    name = "";
  }
  return (
    <li className={selectedInterviewerClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {name}
    </li>
  );
}
