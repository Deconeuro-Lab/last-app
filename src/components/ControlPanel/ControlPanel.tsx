import React from 'react';
import Prompt from '../Prompt/Prompt';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ControlPanel.css';

interface Props {
  subtest: any; // string | NamingSubtest
  testCategory: string;
  isTimerRequired: boolean;
  entireTestIsDone: boolean;
  currentSubtestHasStarted: boolean;
  currentSubtestMSElapsed: number;
  // functions for subtests:
  goToNextSubtest: () => void;
  recordSubtestResult: (passed: boolean, isTimerRequired: boolean) => void;
  // react setState hooks:
  setCurrentSubtestMSElapsed: React.Dispatch<React.SetStateAction<number>>;
  setCurrentSubtestHasStarted: React.Dispatch<React.SetStateAction<boolean>>;
}

const ControlPanel: React.FC<Props> = ({
  subtest,
  testCategory,
  isTimerRequired,
  currentSubtestHasStarted,
  entireTestIsDone,
  currentSubtestMSElapsed,
  goToNextSubtest,
  recordSubtestResult,
  setCurrentSubtestMSElapsed,
  setCurrentSubtestHasStarted
}) => {
  let prompt1: JSX.Element;
  let prompt2: JSX.Element;

  // TODO: the following hardcoded mess needs to be refactored lol

  if (testCategory === 'naming') {
    const popover = (
      <Popover id="">
        <Popover.Title as="h3">Highlighted Object</Popover.Title>
        <Popover.Content>
          <p>
            <strong>Correct Responses</strong>: {subtest.acceptableResponses.join(', ')}
          </p>
          {subtest.incorrectResponses.length > 0 ? (
            <p>
              <strong>Incorrect Responses</strong>: {subtest.incorrectResponses.join(', ')}
            </p>
          ) : null}
        </Popover.Content>
      </Popover>
    );

    prompt1 = (
      <p className="m-0">
        Ask the patient to name the {' '}
        <OverlayTrigger placement="top" overlay={popover}>
          <span style={{ cursor: 'pointer', fontWeight: 'bold' }}>highlighted object</span>
        </OverlayTrigger>
        . Then start the timer.
      </p>
    );
    prompt2 = <p>Stop the timer when an answer is provided.</p>;
  } else if (testCategory === 'repetition') {
    prompt1 = <p className="m-0">Ask the patient to repeat the following word or sentence after you:</p>;
    prompt2 = <p>"{subtest}"</p>;
  } else if (testCategory === 'autoseq') {
    prompt1 = <p className="m-0">Ask the patient to do the following:</p>;
    prompt2 = <p>"{subtest}"</p>;
  } else if (testCategory === 'picID') {
    prompt1 = (
      <p className="m-0">
        Ask the patient to click on the <strong>{subtest}</strong>. Then start the timer.
      </p>
    );
    prompt2 = <p>Stop the timer when an answer is provided.</p>;
  } else if (testCategory === 'verbal') {
    prompt1 = <p className="m-0">Name the objects before starting the trial. Ask the patient to do the following:</p>;
    prompt2 = <p>"{subtest}"</p>;
  } else {
    prompt1 = <p className="m-0">The test has concluded.</p>;
    prompt2 = <p>You may now export the test results.</p>;
  }

  const onPassFailBtnClick = (passed: boolean): void => {
    recordSubtestResult(passed, isTimerRequired);
    goToNextSubtest();
  };

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
          currentSubtestMSElapsed={currentSubtestMSElapsed}
          setCurrentSubtestMSElapsed={setCurrentSubtestMSElapsed}
          setCurrentSubtestHasStarted={setCurrentSubtestHasStarted}
        />
        {/* <button className="btn subtle-label">Need help?</button> */}
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
};

export default ControlPanel;
