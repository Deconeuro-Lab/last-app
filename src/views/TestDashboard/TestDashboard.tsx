import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import ViewPanel from '../../components/ViewPanel/ViewPanel';
import ControlPanel from '../../components/ControlPanel/ControlPanel';

import TestResultsModal from '../../components/TestResultsModal/TestResultsModal';
import YesNoConfirmModal from '../../components/YesNoConfirmModal/YesNoConfirmModal';

import TestSummaryBar from '../../components/TestSummaryBar/TestSummaryBar';
import BackButton from '../../components/BackButton/BackButton';
import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TestDashboard.css';

import LASTests from '../../data/LASTests';

type Props = any;

type NamingSubtest = {
  item: string;
  jpg: string;
  acceptableResponses: string[];
  incorrectResponses: string[];
};

type GenericSubtest = string;

type SubtestResult = {
  passed: boolean;
  secondsElapsed: number | null;
  subtest: GenericSubtest | NamingSubtest;
};

type TestResults = {
  [key: string]: SubtestResult[]; // the key of the key-value pair is the name of a subtest category
};

const TestDashboard: React.FC<Props> = (props) => {
  // (sub)test state
  const [ results, setResults ] = useState<TestResults>({});
  const [ entireTestIsDone, setEntireTestIsDone ] = useState(false);
  const [ currentSubtestIndex, setCurrentSubtestIndex ] = useState(0);
  const [ currentTestCategoryIndex, setCurrentTestCategoryIndex ] = useState(0);
  // modal (popups) state
  const [ showTestResultsModal, setShowTestResultsModal ] = useState(false);
  const [ showGoBackModal, setShowGoBackModal ] = useState(false);
  // subtest timer state
  const [ currentSubtestHasStarted, setCurrentSubtestHasStarted ] = useState(false);
  const [ currentSubtestMSElapsed, setCurrentSubtestMSElapsed ] = useState(0); // miliseconds elapsed for the current subtest (ie. name the pineapple)

  // show the modal whenver a set of tests is done (index gets reset to 0)
  useEffect(
    () => {
      if (currentSubtestIndex === 0 && currentTestCategoryIndex !== 0) {
        setShowTestResultsModal(true);
      }
    },
    [ currentTestCategoryIndex ]
  );

  // when the entire test is done
  useEffect(
    () => {
      if (entireTestIsDone) {
        // TODO: clean up state
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

  if (!loggedIn) return <Redirect to="/" />;
  if (!userFirstName || !userLastName || userType !== 'examiner') return <Redirect to="/user-registration" />;

  // get test version (A or B)
  const pathElements = props.location.pathname.split('/');
  const testVersion: 'A' | 'B' = pathElements[pathElements.length - 1];

  // init test
  const tests = LASTests[testVersion];
  const testCategories = LASTests['categoriesInOrder'];

  // init subtest
  let currentTestCategory: string = '';
  let currentSubtest: GenericSubtest | NamingSubtest = '';

  if (currentTestCategoryIndex >= 0 && currentSubtestIndex >= 0) {
    currentTestCategory = testCategories[currentTestCategoryIndex];
    currentSubtest = tests[currentTestCategory][currentSubtestIndex];
  }

  // saves the result of the subtest into the 'results' object
  const recordSubtestResult = (passed: boolean, isTimerRequired: boolean) => {
    const newResult: SubtestResult = {
      passed: passed,
      subtest: currentSubtest,
      secondsElapsed: isTimerRequired ? currentSubtestMSElapsed / 100 : null
    };

    const newResults: TestResults = { ...results };

    if (newResults[currentTestCategory]) {
      // append to existing array
      newResults[currentTestCategory] = [ ...newResults[currentTestCategory], newResult ];
    } else {
      // create new array
      newResults[currentTestCategory] = [ newResult ];
    }

    setResults(newResults);
  };

  const goToNextSubtest = () => {
    setNextTestIndices();
    setCurrentSubtestHasStarted(false);
    setCurrentSubtestMSElapsed(0);
  };

  // sets the indices that point to the next subtest
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
      <BackButton showModal={() => setShowGoBackModal(true)} />

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
        testVersion={testVersion}
      />

      <YesNoConfirmModal
        show={showGoBackModal}
        hideModal={() => setShowGoBackModal(false)}
        text1="Are you sure you want to exit?"
        text2="All test progress will be lost."
        action={props.history.goBack}
      />

      {/* TODO: INSTRUCTIONS MODAL */}
    </div>
  );
};

export default TestDashboard;
