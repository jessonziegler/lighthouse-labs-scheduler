export function getAppointmentsForDay(state, day) {
  const foundDay = state.days.find((dayObject) => dayObject.name === day);
  console.log(foundDay);
  if (foundDay === undefined) {
    return [];
  }
  const foundDayAppointments = foundDay.appointments.map((appointment_id) => {
    return state.appointments[appointment_id];
  });
  console.log(foundDayAppointments);
  return foundDayAppointments;
}

export function getInterviewersForDay(state, day) {
  const result = [];
  const dayData = state.days.filter((d) => d.name === day);

  if (!dayData[0]) return result;
  for (const a of dayData[0].interviewers) {
    console.log(state.interviewers[a]);
    result.push(state.interviewers[a]);
  }

  return result;
}

export function getInterview(state, interview) {
  if (!interview) return null;
  const { interviewer } = interview;
  const interviewerData = state.interviewers[interviewer];
  const interviewWithInterviewerInfo = {
    student: interview.student,
    interviewer: interviewerData,
  };
  return interviewWithInterviewerInfo;
}
