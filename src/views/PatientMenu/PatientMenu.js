import React, { useEffect, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import InfoAlertModal from '../../components/InfoAlertModal/InfoAlertModal';
import LoadingDots from '../../components/LoadingDots/LoadingDots';
import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Menus.css';

import ws from '../../websocket';

function PatientMenu() {
  const [ wantsToReenterUserInfo, setWantsToReenterUserInfo ] = useState(false);
  // patient session
  const [ sessionID, setSessionID ] = useState('');
  // examiner session
  const [ examiner, setExaminer ] = useState({});
  const [ showModal, setShowModal ] = useState(false);

  useEffect(() => {
    if (ws.connected) socketSetup();

    ws.on('connect', socketSetup);
    ws.on('reconnect', socketSetup);
    ws.on('disconnect', socketCleanup);
    ws.on('requestFromExaminer', (examiner) => {
      setExaminer(examiner);
      setShowModal(true);
    });

    return () => {
      ws.off('connect');
      ws.off('reconnect');
      ws.off('disconnect');
      ws.off('notify');
    };
  }, []);

  const socketSetup = () => {
    setSessionID(generateSessionID(ws.id));
    ws.emit(`patientRegistration`, firstName, lastName);
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
  const firstName = Cookies.get('userFirstName');
  const lastName = Cookies.get('userLastName');
  const userType = Cookies.get('userType');

  if (!loggedIn) return <Redirect to="/" />;
  if (userType === 'examiner') return <Redirect to="/examiner" />;
  if (wantsToReenterUserInfo || !firstName || !lastName || !userType) {
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
      <p className="m-0">Welcome, {firstName}.</p>
      <p className="m-0">You are registered as a patient.</p>
      {sessionID ? (
        <div>
          <p className="m-0">
            Your session ID is <strong>{sessionID}</strong>.
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

      <InfoAlertModal
        show={showModal}
        hideModal={() => setShowModal(false)}
        label1={<p className="m-0">{`${examiner.firstName} ${examiner.lastName} wants to connect!`}</p>}
        label2={
          <p className="m-0">
            Please confirm that their session ID is <strong>{examiner.sessionID}</strong>.
          </p>
        }
      />
    </div>
  );
}

export default PatientMenu;
