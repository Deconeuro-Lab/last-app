import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function UserRegistration(props) {

  const [toTests, setToTests] = useState(false);
  const [userType, setUserType] = useState("examiner");
  const [userFullName, setUserFullName] = useState("");

  // redirects data, passed from previous page
  const prev = props.location.state;
  if (!prev || !prev.isAuthorized) {
    return <Redirect to="/" />
  }

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
    <div className="UserRegistration">
      <h4>
        LASTen App
      </h4>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label >Full Name</label>
          <input type="text" className="form-control" autoComplete="off" placeholder="John Smith" onChange={onUserFullNameChange} />
        </div>
        <div className="form-group">
          <label >{userTypeLabel}</label>
          <select className="form-control" onChange={onUserTypeChange}>
            <option value="examiner">Examiner</option>
            <option value="patient">Patient</option>
          </select>
        </div>
        <button className="btn btn-menu btn-outline-primary">Proceed</button>
      </form>
    </div>
  );
}

export default UserRegistration;
