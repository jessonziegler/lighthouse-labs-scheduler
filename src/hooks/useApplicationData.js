import axios from "axios";
import { useEffect, useState } from "react";

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    let days;
    console.log("hey", state.appointments[id].interview);
    if (state.appointments[id].interview === null) {
      days = state.days.map((day) =>
        day.appointments.includes(id) ? { ...day, spots: day.spots - 1 } : day
      );
    } else {
      days = state.days.map((day) =>
        day.appointments.includes(id) ? { ...day, spots: day.spots } : day
      );
    }
    return axios.put(`/api/appointments/${id}`, { interview }).then((res) => {
      setState((prev) => ({ ...prev, days, appointments }));
    });
  }

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`).then((res) => {
      const days = state.days.map((day) =>
        day.appointments.includes(id) ? { ...day, spots: day.spots + 1 } : day
      );

      setState((prev) => {
        const appointment = {
          ...prev.appointments[id],
          interview: null,
        };
        const appointments = {
          ...prev.appointments,
          [id]: appointment,
        };
        return {
          ...prev,
          days,
          appointments,
        };
      });
    });
  }

  return { state, setDay, bookInterview, cancelInterview };
};
export default useApplicationData;
