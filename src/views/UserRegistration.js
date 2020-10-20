import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';

function UserRegistration(props) {
  const [ toTests, setToTests ] = useState(false);
  const [ toAuth, setToAuth ] = useState(false);
  const [ showModal, setShowModal ] = useState(false);
  const [ userType, setUserType ] = useState('examiner');
  const [ userFirstName, setUserFirstName ] = useState('');
  const [ userLastName, setUserLastName ] = useState('');
  const [ hadSubmittedEmptyForm, setHadSubmittedEmptyForm ] = useState(false);

  useEffect(() => {
    setUserFirstName(prevUserFirstName);
    setUserLastName(prevUserLastName);
    setUserType(prevUserType || 'examiner');
  }, []);

  const loggedIn = Cookies.get('loggedIn');
  const prevUserFirstName = Cookies.get('userFirstName');
  const prevUserLastName = Cookies.get('userLastName');
  const prevUserType = Cookies.get('userType');

  if (!loggedIn || toAuth) {
    return <Redirect to="/" />;
  } else if (toTests || (!props.location.state && (prevUserFirstName && prevUserLastName && prevUserType))) {
    return (
      <Redirect
        to={{
          pathname: '/tests',
          state: { userFirstName, userLastName, userType }
        }}
      />
    );
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (userFirstName && userLastName && userType) {
      Cookies.set('userFirstName', userFirstName.trim());
      Cookies.set('userLastName', userLastName.trim());
      Cookies.set('userType', userType);
      setToTests(true);
      setHadSubmittedEmptyForm(false);
    } else {
      setHadSubmittedEmptyForm(true);
    }
  };

  const signOut = (e) => {
    Cookies.remove('loggedIn');
    Cookies.remove('userFirstName');
    Cookies.remove('userLastName');
    Cookies.remove('userType');
    Cookies.remove('noPulse');
    setToAuth(true);
  };

  const onUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const onUserFirstNameChange = (e) => {
    setUserFirstName(e.target.value);
  };

  const onUserLastNameChange = (e) => {
    setUserLastName(e.target.value);
  };

  let userTypeLabel = '';
  if (userType === 'examiner') {
    userTypeLabel = 'I am an...';
  } else {
    userTypeLabel = 'I am a...';
  }

  let label;
  if (hadSubmittedEmptyForm) {
    label = (
      <p style={{ color: 'red' }} className="subtle-label">
        Please complete the form.
      </p>
    );
  } else {
    label = (
      <p className="subtle-label" style={{ visibility: 'hidden' }}>
        a
      </p>
    );
  }

  return (
    <div className="UserRegistration">
      <h4>LASTen App</h4>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>{userTypeLabel}</label>
          <select className="form-control" onChange={onUserTypeChange} value={userType}>
            <option value="examiner">Examiner</option>
            <option value="patient">Patient</option>
          </select>
        </div>
        <div className="form-group">
          <label>My name is...</label>
          <input
            type="text"
            className="form-control"
            autoComplete="off"
            placeholder="First Name"
            onChange={onUserFirstNameChange}
            value={userFirstName}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            autoComplete="off"
            placeholder="Last Name"
            onChange={onUserLastNameChange}
            value={userLastName}
          />
        </div>
        {label}
        <button className="btn btn-menu btn-outline-primary">Register</button>
      </form>
      <p className="btn w-100 subtle-label" onClick={() => setShowModal(true)}>
        Click here to sign out and erase session history.
      </p>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="sm" centered>
        <Modal.Body>
          Are you sure you want to sign out?
          <Button style={{ float: 'right' }} variant="secondary-outline" onClick={signOut}>
            Yes
          </Button>
          <Button style={{ float: 'right' }} variant="secondary-outline" onClick={() => setShowModal(false)}>
            No
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default UserRegistration;
