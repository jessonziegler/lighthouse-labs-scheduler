import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (!replace) {
      setHistory((prev) => [...prev, newMode]);
      setMode(newMode);
    }
    setMode(newMode);
  }
  function back() {
    history.pop();
    if (history.length) {
      const prevMode = history[history.length - 1];
      setMode(prevMode);
    }
  }
  return { mode, transition, back };
}
