import React, { useEffect, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';

const ExaminerTests: React.FC = () => {
  const loggedIn = Cookies.get('loggedIn');
  const firstName = Cookies.get('userFirstName');
  const lastName = Cookies.get('userLastName');
  const userType = Cookies.get('userType');

  if (!loggedIn) return <Redirect to="/" />;
  if (userType === 'patient') return <Redirect to="/patient" />;
  if (!firstName || !lastName || !userType) {
    return (
      <Redirect
        to={{
          pathname: '/user-registration',
          state: { wantsToReenterUserInfo: true }
        }}
      />
    );
  }

  return (
    <div className="ExaminerTests d-flex flex-column align-items-center">
      <h4>LASTen App</h4>
      <p className="m-0">Welcome, {firstName}.</p>
      <p>You are registered as an examiner.</p>
      <p className="m-0">Select Test Version:</p>
      <Link to="/examiner/tests/A">
        <button className="btn btn-menu btn-outline-primary m-2">Version A</button>
      </Link>
      <Link to="/examiner/tests/B">
        <button className="btn btn-menu btn-outline-primary m-2">Version B</button>
      </Link>
      <Link to="/examiner">
        <p className="btn w-100 subtle-label">Click here to go back.</p>
      </Link>
    </div>
  );
};

export default ExaminerTests;
