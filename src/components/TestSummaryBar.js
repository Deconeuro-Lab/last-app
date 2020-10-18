import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import '../css/TestDashboard/TestSummaryBar.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function TestSummaryBar(props) {
  const [ hasBeenClicked, setHasBeenClicked ] = useState(false);

  useEffect(() => {
    if (Cookies.get('noPulse')) {
      setHasBeenClicked(true);
    }
  }, []);

  const { testCategory, numberOfTests, ithTest } = props;
  const mapFullCategoryName = {
    naming: 'Naming',
    repetition: 'Repetition',
    autoseq: 'Automatic Sequence',
    picID: 'Picture Identification',
    verbal: 'Verbal Commands'
  };

  const handleClick = (e) => {
    Cookies.set('noPulse', true);
    setHasBeenClicked(true);
    props.openModal();
  };

  let label;
  const fullCategoryName = mapFullCategoryName[testCategory];
  if (fullCategoryName) {
    label = `Current Test: ${fullCategoryName} (${ithTest}/${numberOfTests})`;
  } else {
    label = 'View Results';
  }

  return (
    <div className={'TestSummaryBar ' + (!hasBeenClicked ? 'pulse' : null)}>
      <p className="TestSummaryBar-Text" onClick={handleClick}>
        {label}
      </p>
    </div>
  );
}

export default TestSummaryBar;
