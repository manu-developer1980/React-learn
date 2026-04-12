"use client";
import { useState, useEffect } from "react";

export default function ClientClock() {
  const [time, setTime] = useState("--/--/--, --:--:--");

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleString());
    const timerId = window.setInterval(tick, 1000);
    return () => window.clearInterval(timerId);
  }, []);
  return <div>{time}</div>;
}
