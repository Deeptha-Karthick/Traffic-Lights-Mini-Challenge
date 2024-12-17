import "./styles.css";
import { useState, useRef, useEffect } from "react";

export default function App() {
  const stopTimer = 5;
  const waitTimer = 2;
  const goTimer = 3;
  const [stop, setStop] = useState(true);
  const [wait, setWait] = useState(false);
  const [go, setGo] = useState(false);
  const [seconds, setSeconds] = useState(stopTimer);

  let timerId = useRef("");

  //to control red
  useEffect(() => {
    if (stop) {
      timerId.current = setInterval(() => {
        if (seconds === 1) {
          clearInterval(timerId.current);
          setStop(false);
          setGo(true);
          setSeconds(goTimer);
        } else {
          setSeconds((prev) => prev - 1);
        }
      }, 1000);
    }
    return () => clearInterval(timerId.current);
  }, [stop, seconds]); // Dependency array includes stop

  //to control green
  useEffect(() => {
    if (go) {
      timerId.current = setInterval(() => {
        if (seconds === 1) {
          clearInterval(timerId.current);
          setGo(false);
          setWait(true);
          setSeconds(waitTimer);
        } else {
          setSeconds((prev) => prev - 1);
        }
      }, 1000);
    }
    return () => clearInterval(timerId.current);
  }, [go, seconds]); // Dependency array includes stop

  useEffect(() => {
    if (wait) {
      timerId.current = setInterval(() => {
        if (seconds === 1) {
          clearInterval(timerId.current);
          setWait(false);
          setStop(true);
          setSeconds(stopTimer);
        } else {
          setSeconds((prev) => prev - 1);
        }
      }, 1000);
    }
    return () => clearInterval(timerId.current);
  }, [wait, seconds]); // Dependency array includes stop

  return (
    <div className="App">
      <h1>Traffic Lights</h1>
      <div className="traffic-lights-container">
        <div className="traffic-lights">
          <div className={`light ${stop ? "stop" : "grey"}`}></div>
          <div className={`light ${wait ? "wait" : "grey"}`}></div>
          <div className={`light ${go ? "go" : "grey"}`}></div>
        </div>
      </div>
      <div className="seconds-left">
        <strong>{seconds} Seconds</strong>
      </div>
    </div>
  );
}
