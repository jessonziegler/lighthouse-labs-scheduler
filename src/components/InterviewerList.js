import React from "react";
import classNames from "classnames";
import "./InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
  const interviewerList = props.interviewers.map((item) => {
    const selected = props.interviewer === item.id;
    const interviewerListClass = classNames("interviewers__item", {
      "interviewers__item--selected": selected,
    });
    return (
      <InterviewerListItem
        name={item.name}
        avatar={item.avatar}
        selected={selected}
        setInterviewer={() => props.setInterviewer(item.id)}
      />
    );

    // return (
    //   <div className={interviewerListClass}>
    //     <img
    //       key={item.id}
    //       className={"interviewers__item-image"}
    //       onClick={() => props.setInterviewer(item.id)}
    //       src={item.avatar}
    //       alt={"test"}
    //     />
    //     {selected && item.name}
    //   </div>
    // );
  });
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerList}</ul>
    </section>
  );
}
