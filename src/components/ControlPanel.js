import React from 'react';
import Prompt from './Prompt';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/TestDashboard/ControlPanel.css'

function ControlPanel(props) {

  const {
    subtest,
    testCategory,
    isTimerRequired,
    currentSubtestHasStarted,
    entireTestIsDone
  } = props;

  let prompt1;
  let prompt2;
  if (testCategory === 'naming') {
    prompt1 = 'Ask the patient to name the highlighted object. Then start the timer.';
    prompt2 = 'Stop the timer when an answer is provided.';
  }
  else if (testCategory === 'repetition') {
    prompt1 = 'Ask the patient to repeat the following word or sentence:';
    prompt2 = `"${subtest}"`;
  }
  else if (testCategory === 'autoseq') {
    prompt1 = 'Ask the patient to do the following:';
    prompt2 = `"${subtest}"`;
  }
  else if (testCategory === 'picID') {
    prompt1 = `Ask the patient to show you the ${subtest}. Then start the timer.`;
    prompt2 = 'Stop the timer when an answer is provided.';
  }
  else if (testCategory === 'verbal') {
    prompt1 = 'Name the objects before starting the trial. Ask the patient to do the following:';
    prompt2 = `"${subtest}"`;
  }
  else {
    prompt1 = 'The test has concluded.'
    prompt2 = 'You will be able to view and export the test results in the next update.'
  }

  const onPassFailBtnClick = (passed) => {
    props.recordSubtestResult(passed, isTimerRequired);
    props.goToNextSubtest();
  }

  return (
    <div className="ControlPanel">
      <button
        type="button"
        id="btn-fail"
        className="btn btn-test btn-danger btn-control-passfail"
        value="fail"
        disabled={(!currentSubtestHasStarted && isTimerRequired) || entireTestIsDone}
        onClick={() => onPassFailBtnClick(false)}
      >
        Fail
      </button>

      <section className="ControlPanel-Center">
        <Prompt
          prompt1={prompt1}
          prompt2={prompt2}
          isTimerRequired={isTimerRequired}

          setCurrentSubtestHasStarted={props.setCurrentSubtestHasStarted}
          setCurrentSubtestMSElapsed={props.setCurrentSubtestMSElapsed}
          currentSubtestMSElapsed={props.currentSubtestMSElapsed}
        />
        {/* <button className="mt-3" className="btn subtle-label">Need help?</button> */}
      </section>

      <button
        type="button"
        id="btn-pass"
        className="btn btn-test btn-success btn-control-passfail"
        value="pass"
        disabled={(!currentSubtestHasStarted && isTimerRequired) || entireTestIsDone}
        onClick={() => onPassFailBtnClick(true)}
      >
        Pass
      </button>
    </div>
  );
}

export default ControlPanel;
