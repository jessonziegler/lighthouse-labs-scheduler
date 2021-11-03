import React from "react";
import "./InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";
export default function InterviewerList(props) {
  const { onChange } = props;

  const interviewerList = props.interviewers.map((item) => {
    const selected = props.value === item.id;
    // const interviewerListClass = classNames("interviewers__item", {
    //   "interviewers__item--selected": selected,
    // });
    return (
      <InterviewerListItem
        key={item.id}
        name={item.name}
        avatar={item.avatar}
        selected={selected}
        setInterviewer={() => onChange(item.id)}
      />
    );
  });
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerList}</ul>
    </section>
  );
}
