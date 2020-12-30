import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ViewPanel.css';

function ViewPanel(props) {
  const { subtest, testCategory, testVersion } = props;
  let viewElement;

  // TODO: modularize this better
  if (subtest && subtest.jpg) {
    viewElement = (
      <img
        className="ViewPanel-Image fade-in"
        src={require(`../../img/version${testVersion}/${testCategory}/${subtest.jpg}`)}
        alt={subtest.item}
        draggable="false"
      />
    );
  } else if (testCategory === 'picID') {
    viewElement = (
      <img
        className="ViewPanel-Image fade-in"
        src={require(`../../img/version${testVersion}/${testCategory}/test.png`)}
        alt="test"
        draggable="false"
      />
    );
  } else {
    // placeholder if no image
    // viewElement = <p>"{subtest}"</p>;
    viewElement = <p>Déconeuro™ Lab</p>;
  }

  // on mount and on orientation change, format test image height

  return (
    <div className={'ViewPanel ' + (testCategory === 'naming' ? 'ViewPanel-Dark' : 'ViewPanel-Light')}>
      {viewElement}
    </div>
  );
}

export default ViewPanel;
