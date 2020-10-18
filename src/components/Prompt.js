import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/TestDashboard/Prompt.css';

function Prompt(props) {
  const { prompt1, prompt2, isTimerRequired } = props;

  const [ isPaused, setIsPaused ] = useState(true);
  const [ msElapsed, setMsElapsed ] = useState(0); // miliseconds

  useInterval(() => {
    if (!isPaused) {
      let updatedMsElapsed = msElapsed + 1;
      setMsElapsed(updatedMsElapsed);
      props.setCurrentSubtestMSElapsed(updatedMsElapsed);
    }
  }, 10);

  useEffect(
    () => {
      // reset timer if the current subtest timer has been reset (ie. going to the next subtest)
      if (props.currentSubtestMSElapsed === 0) {
        resetTimer();
      }
    },
    [ props.currentSubtestMSElapsed ]
  );

  const onTimerBtnClick = (e) => {
    props.setCurrentSubtestHasStarted(true);
    setIsPaused(!isPaused);
  };

  const resetTimer = () => {
    setIsPaused(true);
    setMsElapsed(0);
  };

  let component;
  if (isTimerRequired) {
    // calculate time to display
    const currentS = Math.floor(msElapsed / 100); // seconds
    const currentMs = msElapsed % 100; // milliseconds
    const timeElapsedLabel = `${currentS}:${currentMs < 10 ? '0' + currentMs : currentMs}`;

    component = (
      <div className="Prompt">
        <p className={'Prompt-Time ' + (msElapsed >= 500 ? 'Prompt-Time-Bad' : 'Prompt-Time-Good')}>
          {timeElapsedLabel}
        </p>

        {prompt1}
        {prompt2}

        <button
          // deconeuro blue:
          // style={{ backgroundColor: '#65ceca' }}
          className="btn btn-test btn-primary btn-control Timer-Btn"
          onClick={onTimerBtnClick}
        >
          {isPaused ? 'Start' : 'Stop'}
        </button>
      </div>
    );
  } else {
    component = (
      <div className="Prompt">
        <p className="m-0">{prompt1}</p>
        <p>{prompt2}</p>
      </div>
    );
  }

  return component;
}

// custom react hook: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(
    () => {
      savedCallback.current = callback;
    },
    [ callback ]
  );

  // Set up the interval.
  useEffect(
    () => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    },
    [ delay ]
  );
}

export default Prompt;
