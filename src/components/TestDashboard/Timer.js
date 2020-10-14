import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../css/TestDashboard/Timer.css'

function Timer(props) {

  const [isPaused, setIsPaused] = useState(true);
  const [msElapsed, setMsElapsed] = useState(0); // miliseconds
  
  useInterval(() => {
    if (!isPaused) {
      let updatedMsElapsed = msElapsed + 1;
      setMsElapsed(updatedMsElapsed);
      props.setCurrentSubtestMSElapsed(updatedMsElapsed);
    }
  }, 10);

  useEffect(() => {
    // reset timer if the current subtest timer has been reset (ie. going to the next subtest)
    if (props.currentSubtestMSElapsed === 0) {
      resetTimer();
    }
  }, [props.currentSubtestMSElapsed])

  const onTimerBtnClick = e => {
    props.setCurrentSubtestHasStarted(true);
    setIsPaused(!isPaused);
  }

  const resetTimer = () => {
    setIsPaused(true);
    setMsElapsed(0);
  }

  // calculate time to display
  const currentS = Math.floor(msElapsed / 100);  // seconds
  const currentMs = msElapsed % 100;             // milliseconds
  const timeElapsedLabel = `${currentS}:${currentMs < 10 ? "0" + currentMs : currentMs}`;

  return (
    <div className="Timer">
      <p className={"Timer-Time " + (msElapsed >= 500 ? "Timer-Time-Bad" : "Timer-Time-Good")}>{timeElapsedLabel}</p>

      <p className="Timer-Prompt">{props.prompt1}</p>
      <p className="Timer-Prompt">{props.prompt2}</p>

      <button className="btn btn-test btn-primary btn-control Timer-Btn" onClick={onTimerBtnClick}>
        {isPaused? "Start" : "Stop"}
      </button>
    </div>
  );
}

// custom react hook: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default Timer;
