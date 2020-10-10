import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'

function TestMenu(props) {

  const [toHome, setToHome] = useState(false);

  const onBackButtonClick = () => {
    setToHome(true);
  }

  if (toHome) {
    return <Redirect to="/" />
  }

  let userFullName = props.location.state.userFullName;
  let userType = props.location.state.userType;

  return (
    <div className='TestMenu d-flex flex-column align-items-center'>
      <p className="m-0">Welcome, {userFullName}.</p>
      <p>You are registered as {userType === "examiner" ? "an" : "a"} {userType}.</p>

      <p className="m-0">Select Test Version:</p>
      <a className='btn btn-outline-primary m-2'>Version A</a>
      <a className='btn btn-outline-primary m-2'>Version B</a>
      <button className="btn" onClick={onBackButtonClick}>👈</button>
    </div>
  );
}

export default TestMenu;
