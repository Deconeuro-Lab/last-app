import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/BackButton.css';

function BackButton(props) {
  return (
    <div>
      <div className={'BackButton'} onClick={props.showModal}>
        <p className="BackButton-Text">Exit</p>
      </div>
    </div>
  );
}

export default BackButton;
