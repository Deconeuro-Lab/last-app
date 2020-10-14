import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import ViewPanel from '../components/TestDashboard/ViewPanel';
import ControlPanel from '../components/TestDashboard/ControlPanel';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/TestDashboard/TestDashboard.css';

import LASTests from '../data/LASTests';

function TestDashboard(props) {

  // timer state
  const [currentSubtest, setCurrentSubtest] = useState(null);
  const [currentSubtestHasStarted, setCurrentSubtestHasStarted] = useState(false);
  const [currentSubtestMSElapsed, setCurrentSubtestMSElapsed] = useState(0); // miliseconds elapsed for the current subtest (ie. pineapple)

  // going to this path without completing the user form:
  if (!props.location.state) {
    return <Redirect to="/" />
  }

  // get test metadata
  const userFullName = props.location.state.userFullName;
  const userType = props.location.state.userType;
  const pathElements = props.location.pathname.split("/");
  const testVersion = pathElements[pathElements.length - 1];

  // init test
  const subtests = LASTests[testVersion];
  const subtestOrder = LASTests['order'];

  // open manual modal

  const goToNextSubtest = (lastTestResult) =>{
    console.log(`${lastTestResult}ed MS = ${currentSubtestMSElapsed}. Going to next subtest.`);
    // log current subtest results
    // set current subtest to the next one
    setCurrentSubtestHasStarted(false);
    // set ms elapsed for current subtest to 0
    setCurrentSubtestMSElapsed(0);
  }

  return (
    <div className="TestDashboard">
      
      <ViewPanel />

      <ControlPanel
        // pass hooks down, since we need to update the global dashboard state from child components
        currentSubtestMSElapsed={currentSubtestMSElapsed}
        setCurrentSubtestMSElapsed={setCurrentSubtestMSElapsed}

        currentSubtestHasStarted={currentSubtestHasStarted}
        setCurrentSubtestHasStarted={setCurrentSubtestHasStarted}

        goToNextSubtest={goToNextSubtest}
        isTimerRequired={true}
      />

      {/* MANUAL MODAL */}

      {/* RESULTS MODAL */}

    </div>
  );
}

export default TestDashboard;
