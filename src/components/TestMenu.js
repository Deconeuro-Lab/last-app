import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Dot } from 'react-animated-dots';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/menus.css'

function TestMenu(props) {

  const [toHome, setToHome] = useState(false);

  const onBackButtonClick = () => {
    setToHome(true);
  }

  // redirects
  if (toHome || !props.location.state) {
    return <Redirect to="/" />
  }

  // extract user information
  let userFullName = props.location.state.userFullName;
  let userType = props.location.state.userType;

  // generate user options
  let userOptions;
  if (userType === "patient") {
    userOptions = (
      <div>
        <p className="m-0">
          Awaiting instructions from the examiner
        <span className="span-dots m-0">
            <Dot>.</Dot>
            <Dot>.</Dot>
            <Dot>.</Dot>
          </span>
        </p>
        <br />
      </div>
    );
  } else {
    userOptions = (
      <div className="d-flex flex-column">
        <p className="m-0">Select Test Version:</p>
        <Link to={{
          pathname: "/tests/A",
          state: { userFullName, userType }
        }}>
          <button className='btn btn-menu btn-outline-primary m-2'>Version A</button>
        </Link>
        <Link to={{
          pathname: "/tests/B",
          state: { userFullName, userType }
        }}>
          <button className='btn btn-menu btn-outline-primary m-2'>Version B</button>
        </Link>
      </div>
    );
  }

  return (
    <div className='TestMenu d-flex flex-column align-items-center'>
      <h4>LASTen App</h4>
      <p className="m-0">Welcome, {userFullName}.</p>
      <p>You are registered as {userType === "examiner" ? "an" : "a"} {userType}.</p>
      {userOptions}

      {/* <p className="m-0">This is a prototype.</p>
      <p>Some features are still in development.</p> */}
      <button className="btn w-100 subtle-label" onClick={onBackButtonClick}>Click here to re-enter your user info.</button>
    </div>
  );
}

export default TestMenu;
