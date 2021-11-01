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
