import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const dayList = props.days.map((day) => {
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.value}
        onChange={props.onChange}
      />
    );
  });
  return <ul>{dayList}</ul>;
}