import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function AuthForm() {

  const [toTests, setToTests] = useState(false);
  const [userType, setUserType] = useState("");
  const [userFullName, setUserFullName] = useState("");

  const onSubmit = e => {
    e.preventDefault();

    if (userFullName && userType) {
      setToTests(true);
    } else {
      alert("Please fill in the form.")
    }
  }

  const onUserFullNameChange = e => {
    setUserFullName(e.target.value);
  }

  const onUserTypeChange = e => {
    setUserType(e.target.id);
  }

  if (toTests) {
    return <Redirect to="/test-menu" />
  }

  return (
    <div className="AuthForm">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label >Full Name</label>
          <input type="text" className="form-control" id="name" autoComplete="off" onChange={onUserFullNameChange} />
        </div>
        <label >I am the...</label>
        <div className="form-group">
          <div className="custom-control custom-radio custom-control-inline">
            <input type="radio" id="examiner" name="user-type" className="custom-control-input" onChange={onUserTypeChange} />
            <label className="custom-control-label" htmlFor="examiner">Examiner</label>
          </div>
          <div className="custom-control custom-radio custom-control-inline">
            <input type="radio" id="patient" name="user-type" className="custom-control-input" onChange={onUserTypeChange} />
            <label className="custom-control-label" htmlFor="patient">Patient</label>
          </div>
        </div>

        <button className="btn btn-outline-primary">Proceed</button>
      </form>
    </div>
  );
}

export default AuthForm;
