import React, { useEffect, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import LoadingDots from '../components/LoadingDots';
import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/menus.css';

import ws from '../websocket';

function PatientMenu() {
  const [ wantsToReenterUserInfo, setWantsToReenterUserInfo ] = useState(false);
  const [ sessionID, setSessionID ] = useState(''); // first 5 letters of socket id

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
    // TODO: listen for examiner requests
  };

  const socketCleanup = () => {
    setSessionID('');
  };

  const generateSessionID = (socketID) => {
    return socketID.toLowerCase().substring(0, 5); // (TODO: SERVER SHOULD PASS THIS TO CLIENT, not set here)
  };

  const onBackButtonClick = () => {
    setWantsToReenterUserInfo(true);
  };

  const loggedIn = Cookies.get('loggedIn');
  const userFirstName = Cookies.get('userFirstName');
  const userLastName = Cookies.get('userLastName');
  const userType = Cookies.get('userType');

  if (!loggedIn) return <Redirect to="/" />;

  if (wantsToReenterUserInfo || !userFirstName || !userLastName || !userType || userType === 'examiner') {
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
    <div className="PatientMenu d-flex flex-column align-items-center">
      <h4>LASTen App</h4>
      <p className="m-0">Welcome, {userFirstName}.</p>
      <p className="m-0">You are registered as a patient.</p>
      {sessionID ? (
        <div>
          <p className="m-0">
            Your session ID is <strong>{sessionID}</strong>
          </p>
          <p>
            Awaiting examiner connection request<LoadingDots />
          </p>
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

export default PatientMenu;
