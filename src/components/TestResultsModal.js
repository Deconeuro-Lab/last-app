import React, { useState, useEffect } from 'react';
import { Modal, Button, Collapse } from 'react-bootstrap';
import { FaCheck, FaTimes } from 'react-icons/fa';
import exportReport from '../util/csv';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/TestDashboard/TestResultsModal.css';

function TestResultsModal({
  show,
  handleClose,
  testCategories,
  previousTestCategoryIndex,
  tests,
  results,
  entireTestIsDone,
  testVersion
}) {
  // state determines if that section is collapsed (not shown)
  const [ showNaming, setShowNaming ] = useState(false);
  const [ showRepetition, setShowRepetition ] = useState(false);
  const [ showAutoSeq, setShowAutoSeq ] = useState(false);
  const [ showpicID, setShowpicID ] = useState(false);
  const [ showVerbal, setShowVerbal ] = useState(false);

  // we'd like to show the results of the previous test category (list not collapsed)
  // this is undefined at the start and end of the test (so show all categories)
  let testCategoryToShow = testCategories[previousTestCategoryIndex];

  useEffect(
    () => {
      if (mapCategoryCollapse[testCategoryToShow]) {
        // show 1 category
        for (let category in mapCategoryCollapse) {
          if (category === testCategoryToShow) {
            mapCategoryCollapse[category][1](true);
          } else {
            mapCategoryCollapse[category][1](false);
          }
        }
      } else {
        // show all categories
        for (let category in mapCategoryCollapse) {
          mapCategoryCollapse[category][1](true);
        }
      }
    },
    [ previousTestCategoryIndex ]
  );

  const mapCategoryCollapse = {
    naming: [ showNaming, setShowNaming ],
    repetition: [ showRepetition, setShowRepetition ],
    autoseq: [ showAutoSeq, setShowAutoSeq ],
    picID: [ showpicID, setShowpicID ],
    verbal: [ showVerbal, setShowVerbal ]
  };

  const mapFullCategoryName = {
    naming: 'Naming',
    repetition: 'Repetition',
    autoseq: 'Automatic Sequence',
    picID: 'Picture Identification',
    verbal: 'Verbal Commands'
  };

  const generateListOfSubtests = (cat) => {
    return (
      <ul key={cat}>
        {tests[cat].map((subtest, i) => {
          // results[cat] only exists if a at least 1 subtest has been finished in that category
          let resultOfSubtest = results[cat] && results[cat].find((result) => result.subtest === subtest);

          if (resultOfSubtest) {
            let iconResult = resultOfSubtest.passed ? <FaCheck color="green" /> : <FaTimes color="#dc3545" />;
            let secondsElapsed = resultOfSubtest.secondsElapsed ? `(${resultOfSubtest.secondsElapsed}s)` : null;
            let subtestName = subtest.item || subtest;
            return (
              <li key={i}>
                {iconResult} {secondsElapsed} {subtestName}
              </li>
            );
          } else {
            // grey out that subtest (not yet done)
            return (
              <li key={i} style={{ color: 'grey' }}>
                {subtest.item || subtest}
              </li>
            );
          }
        })}
      </ul>
    );
  };

  const body = testCategories.map((cat, i) => {
    let fullCategoryName = mapFullCategoryName[cat];
    let show = mapCategoryCollapse[cat][0];
    let setShow = mapCategoryCollapse[cat][1];
    let ith = i + 1;
    return (
      <div className="TestResultsModal-Section" key={cat}>
        <p
          className="CategoryTitle"
          onClick={() => {
            setShow(!show);
          }}
        >
          {`${ith}. ${fullCategoryName}`}
          <span className="CategoryTitle-DropIcon">
            <i className={'DropIcon-Arrow ' + (show ? 'DropIcon-Arrow-Up' : 'DropIcon-Arrow-Down')} />
          </span>
        </p>
        <Collapse in={mapCategoryCollapse[cat][0]}>{generateListOfSubtests(cat)}</Collapse>
      </div>
    );
  });

  return (
    <Modal show={show} onHide={handleClose} keyboard={false} centered>
      <Modal.Header>
        <Modal.Title>Tests Overview</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button
          variant="none"
          onClick={() => exportReport(results, testCategories, testVersion)}
          style={{ visibility: entireTestIsDone ? 'visible' : 'hidden' }}
        >
          Export to CSV
        </Button>
        <Button variant="none" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default TestResultsModal;
