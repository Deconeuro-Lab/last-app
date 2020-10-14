import React, { useState, useEffect, version } from 'react';
import { Redirect } from 'react-router-dom';
import ViewPanel from '../components/TestDashboard/ViewPanel';
import ControlPanel from '../components/TestDashboard/ControlPanel';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/TestDashboard/TestDashboard.css';

import LASTests from '../data/LASTests';

function TestDashboard(props) {

  // (sub)test state
  const [isTestDone, setIsTestDone] = useState(false);
  const [currentSubtestIndex, setCurrentSubtestIndex] = useState(0);
  const [currentTestCategoryIndex, setCurrentTestCategoryIndex] = useState(0);
  // subtest timer state
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
  const tests = LASTests[testVersion];
  const testCategories = LASTests['categoriesInOrder'];

  // console.log(tests);
  // console.log(testCategories);
  
  // init subtest
  let currentTestCategory;
  let currentSubtest;

  if (currentTestCategoryIndex >= 0 && currentSubtestIndex >= 0) {
    currentTestCategory = testCategories[currentTestCategoryIndex];
    currentSubtest = tests[currentTestCategory][currentSubtestIndex];
    console.log(currentSubtest);
  }
  
  // TODO: open manual modal on the first subtest of each test

  const goToNextSubtest = (lastTestResult) => {
    // console.log(`${lastTestResult}ed MS = ${currentSubtestMSElapsed}. Going to next subtest.`);
    // log current subtest results
    if (!isTestDone) {
      // set current subtest to the next one
      setCurrentSubtestHasStarted(false);
      // set ms elapsed for current subtest to 0
      setCurrentSubtestMSElapsed(0);
      // adjust indices/pointers to test data
      setNextTestIndices();
  
      // console.log(currentTestCategory);
      // console.log(currentSubtest);
    } else {
      console.log(`Entire test (version ${testVersion}) is done.`)
      // clean up state
    }
  }

  // ISSUE HERE WITH SETTING INDICES, next subtest wrong when chaning categories 
  const setNextTestIndices = () => {
    if (currentSubtestIndex + 1 >= tests[currentTestCategory].length) {
      // go to the next test category, if it exists
      setCurrentSubtestIndex(0);
      if (currentTestCategoryIndex + 1 >= testCategories.length) {
        setIsTestDone(true);
        setCurrentSubtestIndex(-1);
        setCurrentTestCategoryIndex(-1);
      } else {
        setCurrentTestCategoryIndex(currentTestCategoryIndex + 1);
      }
    } else {
      setCurrentSubtestIndex(currentSubtestIndex + 1);
    }
  }

  return (
    <div className="TestDashboard">
      
      <ViewPanel
        testVersion={testVersion}
        testCategory={currentTestCategory}
        subtest={currentSubtest}
      />

      <ControlPanel
        testCategory={currentTestCategory}
        subtest={currentSubtest}
        goToNextSubtest={goToNextSubtest}
        isTimerRequired={currentTestCategory === "naming" || currentTestCategory === "picID"} // move this information into LASTests.js

        // pass hooks down, since we need to update the global dashboard state from child components
        currentSubtestMSElapsed={currentSubtestMSElapsed}
        setCurrentSubtestMSElapsed={setCurrentSubtestMSElapsed}

        currentSubtestHasStarted={currentSubtestHasStarted}
        setCurrentSubtestHasStarted={setCurrentSubtestHasStarted}
      />

      {/* TODO: MANUAL MODAL */}

      {/* TODO: RESULTS MODAL */}

    </div>
  );
}

export default TestDashboard;
