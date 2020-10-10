import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import ViewPanel from '../components/TestDashboard/ViewPanel';
import ControlPanel from '../components/TestDashboard/ControlPanel';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/TestDashboard/TestDashboard.css';

import LASTests from '../data/LASTests';

function TestDashboard(props) {

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
  const subtests = LASTests[testVersion];
  const subtestOrder = LASTests['order'];

  console.log(subtests);
  console.log(subtestOrder);

  return (
    <div className="TestDashboard">
      
      <ViewPanel />

      <ControlPanel />

      {/* MANUAL MODAL */}

      {/* RESULTS MODAL */}

    </div>
  );
}

export default TestDashboard;
