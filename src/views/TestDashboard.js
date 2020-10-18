import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import ViewPanel from '../components/ViewPanel';
import ControlPanel from '../components/ControlPanel';
import TestResultsModal from '../components/TestResultsModal';
import TestSummaryBar from '../components/TestSummaryBar';
import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/TestDashboard/TestDashboard.css';

import LASTests from '../data/LASTests';

function TestDashboard(props) {
  // (sub)test state
  const [ results, setResults ] = useState({});
  const [ entireTestIsDone, setEntireTestIsDone ] = useState(false);
  const [ currentSubtestIndex, setCurrentSubtestIndex ] = useState(0);
  const [ currentTestCategoryIndex, setCurrentTestCategoryIndex ] = useState(0);
  // modal (popups) state
  const [ showTestResultsModal, setShowTestResultsModal ] = useState(false);
  // subtest timer state
  const [ currentSubtestHasStarted, setCurrentSubtestHasStarted ] = useState(false);
  const [ currentSubtestMSElapsed, setCurrentSubtestMSElapsed ] = useState(0); // miliseconds elapsed for the current subtest (ie. name the pineapple)

  useEffect(
    () => {
      // show the modal whenver a set of tests is done (index gets reset to 0)
      if (currentSubtestIndex === 0 && currentTestCategoryIndex !== 0) {
        setShowTestResultsModal(true);
      }
    },
    [ currentTestCategoryIndex ]
  );

  useEffect(
    () => {
      if (entireTestIsDone) {
        console.log(`Entire test (version ${testVersion}) is done.`);
        // TODO: clean up state

        // TODO: generate report
        setShowTestResultsModal(true);
        console.log(results);
      }
    },
    [ entireTestIsDone ]
  );

  const loggedIn = Cookies.get('loggedIn');
  const userFirstName = Cookies.get('userFirstName');
  const userLastName = Cookies.get('userLastName');
  const userType = Cookies.get('userType');

  if (!loggedIn) {
    return <Redirect to="/" />;
  } else if (!userFirstName || !userLastName || userType !== 'examiner') {
    return <Redirect to="/user-registration" />;
  }

  // get test version (A or B)
  const pathElements = props.location.pathname.split('/');
  const testVersion = pathElements[pathElements.length - 1];

  // init test
  const tests = LASTests[testVersion];
  const testCategories = LASTests['categoriesInOrder'];

  // init subtest
  let currentTestCategory;
  let currentSubtest;
  if (currentTestCategoryIndex >= 0 && currentSubtestIndex >= 0) {
    currentTestCategory = testCategories[currentTestCategoryIndex];
    currentSubtest = tests[currentTestCategory][currentSubtestIndex];
  }

  const recordSubtestResult = (passed, isTimerRequired) => {
    //save result
    const newResult = {
      passed: passed,
      subtest: currentSubtest,
      secondsElapsed: isTimerRequired ? currentSubtestMSElapsed / 100 : null
    };

    const newResults = { ...results };

    if (newResults[currentTestCategory]) {
      newResults[currentTestCategory] = [ ...newResults[currentTestCategory], newResult ];
    } else {
      newResults[currentTestCategory] = [ newResult ];
    }

    setResults(newResults);
  };

  const goToNextSubtest = () => {
    setNextTestIndices();
    setCurrentSubtestHasStarted(false);
    setCurrentSubtestMSElapsed(0);
  };

  // might be an issue here when updating indices, next subtest wrong when chaning categories
  const setNextTestIndices = () => {
    if (currentSubtestIndex + 1 >= tests[currentTestCategory].length) {
      // go to the next test category, if it exists
      setCurrentSubtestIndex(0);
      if (currentTestCategoryIndex + 1 >= testCategories.length) {
        setEntireTestIsDone(true);
        setCurrentSubtestIndex(-1);
        setCurrentTestCategoryIndex(-1);
      } else {
        setCurrentTestCategoryIndex(currentTestCategoryIndex + 1);
      }
    } else {
      setCurrentSubtestIndex(currentSubtestIndex + 1);
    }
  };

  return (
    <div className="TestDashboard">
      <TestSummaryBar
        testCategory={currentTestCategory}
        openModal={() => setShowTestResultsModal(true)}
        numberOfTests={tests[currentTestCategory] && tests[currentTestCategory].length}
        ithTest={currentSubtestIndex + 1}
      />

      <ViewPanel testVersion={testVersion} testCategory={currentTestCategory} subtest={currentSubtest} />

      <ControlPanel
        // state
        entireTestIsDone={entireTestIsDone}
        subtest={currentSubtest}
        testCategory={currentTestCategory}
        isTimerRequired={currentTestCategory === 'naming' || currentTestCategory === 'picID'} // move this information into LASTests.js
        // parent functions
        goToNextSubtest={goToNextSubtest}
        recordSubtestResult={recordSubtestResult}
        // pass parent hooks down, since we need to update the global dashboard state from child components
        currentSubtestMSElapsed={currentSubtestMSElapsed}
        setCurrentSubtestMSElapsed={setCurrentSubtestMSElapsed}
        currentSubtestHasStarted={currentSubtestHasStarted}
        setCurrentSubtestHasStarted={setCurrentSubtestHasStarted}
      />

      <TestResultsModal
        show={showTestResultsModal}
        handleClose={() => setShowTestResultsModal(false)}
        entireTestIsDone={entireTestIsDone}
        tests={tests}
        results={results}
        previousTestCategoryIndex={currentTestCategoryIndex - 1}
        testCategories={testCategories}
      />

      {/* TODO: INSTRUCTIONS MODAL */}
    </div>
  );
}

export default TestDashboard;
