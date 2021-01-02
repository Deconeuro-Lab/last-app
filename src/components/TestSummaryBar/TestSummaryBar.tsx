import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import './TestSummaryBar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { stringify } from 'querystring';

interface Props {
  testCategory: string;
  numberOfTests: number;
  ithTest: number;
  openModal: () => void;
}

const TestSummaryBar: React.FC<Props> = ({ testCategory, numberOfTests, ithTest, openModal }) => {
  const [ hasBeenClicked, setHasBeenClicked ] = useState(false);

  useEffect(() => {
    if (Cookies.get('noPulse')) {
      setHasBeenClicked(true);
    }
  }, []);

  const mapFullCategoryName: { [key: string]: string } = {
    naming: 'Naming',
    repetition: 'Repetition',
    autoseq: 'Automatic Sequence',
    picID: 'Picture Identification',
    verbal: 'Verbal Commands'
  };

  const handleClick = () => {
    Cookies.set('noPulse', 'true');
    setHasBeenClicked(true);
    openModal();
  };

  let label: string;
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
};

export default TestSummaryBar;
