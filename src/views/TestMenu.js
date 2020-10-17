import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Dot } from 'react-animated-dots';
import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/menus.css'

function TestMenu(props) {

  const [wantsToReenterUserInfo, setWantsToReenterUserInfo] = useState(false);

  const onBackButtonClick = () => {
    setWantsToReenterUserInfo(true);
  }

  const loggedIn = Cookies.get('loggedIn');
  const userFirstName = Cookies.get("userFirstName");
  const userLastName = Cookies.get("userLastName");
  const userType = Cookies.get("userType");

  if (!loggedIn) {
    return <Redirect to='/' />
  }
  else if (wantsToReenterUserInfo || !userFirstName || !userLastName || !userType) {
    return <Redirect to={{
      pathname: '/user-registration',
      state: { wantsToReenterUserInfo }
    }} />
  }

  // generate user options
  let userOptions;
  if (userType === "patient") {
    userOptions = (
      <div>
        <p className="m-0">
          Site under construction, stay tuned
          <span style={{fontSize: '2em'}}>
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
        <Link to="/tests/A">
          <button className='btn btn-menu btn-outline-primary m-2'>Version A</button>
        </Link>
        <Link to="/tests/B">
          <button className='btn btn-menu btn-outline-primary m-2'>Version B</button>
        </Link>
      </div>
    );
  }

  return (
    <div className='TestMenu d-flex flex-column align-items-center'>
      <h4>LASTen App</h4>
      <p className="m-0">Welcome, {userFirstName}.</p>
      <p>You are registered as {userType === "examiner" ? "an" : "a"} {userType}.</p>
      {userOptions}
      <button className="btn w-100 subtle-label" onClick={onBackButtonClick}>Click here to re-enter your user info.</button>
    </div>
  );
}

export default TestMenu;
