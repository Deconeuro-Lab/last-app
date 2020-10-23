import React, { useEffect, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import LoadingDots from '../components/LoadingDots';
import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/menus.css';

import ws from '../websocket';

function ExaminerMenu() {
  const [ wantsToReenterUserInfo, setWantsToReenterUserInfo ] = useState(false);
  const [ sessionID, setSessionID ] = useState(''); // first 5 letters of socket id
  const [ patientSessionIDToConnectTo, setPatientSessionIDToConnectTo ] = useState('');

  useEffect(() => {
    if (ws.connected) socketSetup();

    ws.on('connect', socketSetup);
    ws.on('reconnect', socketSetup);
    ws.on('disconnect', socketCleanup);

    return () => {
      ws.off('connect');
      ws.off('reconnect');
      ws.off('disconnect');
    };
  }, []);

  const socketSetup = () => {
    setSessionID(generateSessionID(ws.id));
    ws.emit(`${userType}Registration`, userFirstName, userLastName);
  };

  const socketCleanup = () => {
    setSessionID('');
  };

  const generateSessionID = (socketID) => {
    return socketID.toLowerCase().substring(0, 5);
  };

  const attemptConnectionWithPatient = (e) => {
    e.preventDefault();

    if (patientSessionIDToConnectTo.length < 5) {
      alert('Enter a 5-character session ID.');
    } else {
      ws.emit('getPatientWithSessionID', patientSessionIDToConnectTo, sessionID, (patient) => {
        if (patient) alert(`Patient found (${patient.firstName}, ${patient.lastName}, ${patient.patientSessionID})`);
        else alert("Patient doesn't exist");
      });
    }
    setPatientSessionIDToConnectTo('');
  };

  const onBackButtonClick = () => {
    setWantsToReenterUserInfo(true);
  };

  const loggedIn = Cookies.get('loggedIn');
  const userFirstName = Cookies.get('userFirstName');
  const userLastName = Cookies.get('userLastName');
  const userType = Cookies.get('userType');

  if (!loggedIn) return <Redirect to="/" />;

  if (wantsToReenterUserInfo || !userFirstName || !userLastName || !userType || userType === 'patient') {
    return (
      <Redirect
        to={{
          pathname: '/user-registration',
          state: { wantsToReenterUserInfo }
        }}
      />
    );
  }

  return (
    <div className="ExaminerMenu d-flex flex-column align-items-center">
      <h4>LASTen App</h4>
      <p className="m-0">Welcome, {userFirstName}.</p>
      <p className="m-0">You are registered as an examiner.</p>
      {sessionID ? (
        <div>
          <p>
            Your session ID is <strong>{sessionID}</strong>
          </p>
          <div className="d-flex flex-column">
            <form onSubmit={attemptConnectionWithPatient}>
              <div className="form-group">
                <input
                  type="text"
                  autoComplete="off"
                  className="form-control"
                  style={{ textAlign: 'center' }}
                  placeholder="Enter Patient Session ID"
                  maxLength={5}
                  value={patientSessionIDToConnectTo}
                  onChange={(e) => setPatientSessionIDToConnectTo(e.target.value)}
                />
              </div>
              <button className="btn btn-sm btn-outline-primary">Connect to Patient</button>
            </form>
            {/* <p className="m-0">Select Test Version:</p>
        <Link to="/tests/A">
          <button className="btn btn-menu btn-outline-primary m-2">Version A</button>
        </Link>
        <Link to="/tests/B">
          <button className="btn btn-menu btn-outline-primary m-2">Version B</button>
        </Link> */}
          </div>
        </div>
      ) : (
        <p>
          Connecting to the server<LoadingDots />
        </p>
      )}
      <button className="btn w-100 subtle-label" onClick={onBackButtonClick}>
        Click here to re-enter your user info.
      </button>
    </div>
  );
}

export default ExaminerMenu;
