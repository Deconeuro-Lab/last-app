import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BackButton.css';

interface Props {
  action(): void;
}

const BackButton: React.FC<Props> = ({ action }) => {
  return (
    <div>
      <div className={'BackButton'} onClick={action}>
        <p className="BackButton-Text">Exit</p>
      </div>
    </div>
  );
};

export default BackButton;
