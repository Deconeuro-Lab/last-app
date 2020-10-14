import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function AuthForm() {

  const [toTests, setToTests] = useState(false);
  const [userType, setUserType] = useState("examiner");
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
    setUserFullName(e.target.value.trim());
  }

  const onUserTypeChange = e => {
    setUserType(e.target.value);
  }

  if (toTests) {
    return <Redirect to={{
      pathname: "/tests",
      state: { userFullName, userType }
    }} />
  }

  let userTypeLabel = "";
  if (userType === "examiner") {
    userTypeLabel = "I am an"
  } else {
    userTypeLabel = "I am a"
  }

  return (
    <div className="AuthForm">
      <h4>
        LAST
        <select name="language" id="language" size="1">
          <option value="en">en</option>
        </select>
        App
      </h4>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label >Full Name</label>
          <input type="text" className="form-control" id="name" autoComplete="off" placeholder="John Smith" onChange={onUserFullNameChange} />
        </div>
        <div className="form-group">
          <label >{userTypeLabel}</label>
          <select className="form-control" name="user-type" id="user-type" onChange={onUserTypeChange}>
            <option value="examiner">Examiner</option>
            <option value="patient">Patient</option>
          </select>
        </div>
        <button className="btn btn-menu btn-outline-primary">Proceed</button>
      </form>
    </div>
  );
}

export default AuthForm;
