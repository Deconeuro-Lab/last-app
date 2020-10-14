import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../css/TestDashboard/ViewPanel.css'

function ViewPanel(props) {

  const {subtest, testCategory, testVersion} = props;
  let viewElement;

  // TODO: modularize this better
  if (subtest && subtest.jpg) {
    viewElement = <img className="ViewPanel-Image" src={require(`../../img/version${testVersion}/${testCategory}/${subtest.jpg}`)} alt={subtest.item} />
  }
  else if (testCategory === 'picID') {
    viewElement = <img className="ViewPanel-Image" src={require(`../../img/version${testVersion}/${testCategory}/test.png`)} alt="test" />
  }

  // if no img src, display LAST placeholder 
  
  // on mount and on orientation change, format test image height

  return (
    <div className="ViewPanel">
      {viewElement}
    </div>
  );
}

export default ViewPanel;
