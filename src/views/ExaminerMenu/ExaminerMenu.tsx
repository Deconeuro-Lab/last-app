import React, { FormEvent, useEffect, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import InfoAlertModal from '../../components/InfoAlertModal/InfoAlertModal';
import LoadingDots from '../../components/LoadingDots/LoadingDots';
import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Menus.css';

import { Patient } from '../../types/User';

import ws from '../../websocket';

const ExaminerMenu: React.FC = () => {
  // network connection state
  const [ sessionID, setSessionID ] = useState(''); // first 5 letters of socket id
  const [ patientSessionIDToConnectTo, setPatientSessionIDToConnectTo ] = useState('');
  const [ patient, setPatient ] = useState<Patient>({ firstName: '', lastName: '', sessionID: '' });
  // modal (popups) state
  const [ showPatientFoundModal, setShowPatientFoundModal ] = useState(false);
  const [ showPatientNotFoundModal, setShowPatientNotFoundModal ] = useState(false);
  const [ showInvalidSessionIDModal, setShowInvalidSessionIDModal ] = useState(false);

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
    console.log(ws);
    setSessionID(generateSessionID(ws.id));
    ws.emit(`examinerRegistration`, firstName, lastName);
  };

  const socketCleanup = () => {
    setSessionID('');
  };

  // MOVE TO SERVERSIDE (to generate session IDs)
  const generateSessionID = (socketID: string): string => {
    return socketID.toLowerCase().substring(0, 5);
  };

  const attemptConnectionWithPatient = (e: FormEvent) => {
    e.preventDefault();

    if (patientSessionIDToConnectTo.length < 5) {
      setShowInvalidSessionIDModal(true);
    } else {
      let examiner = { firstName, lastName, sessionID };
      ws.emit('getPatientWithSessionID', patientSessionIDToConnectTo, examiner, (patient: any) => {
        if (patient) {
          setPatient(patient);
          setShowPatientFoundModal(true);
        } else {
          setShowPatientNotFoundModal(true);
        }
      });
    }
  };

  const loggedIn = Cookies.get('loggedIn');
  const firstName = Cookies.get('userFirstName');
  const lastName = Cookies.get('userLastName');
  const userType = Cookies.get('userType');

  if (!loggedIn) return <Redirect to="/" />;
  if (userType === 'patient') return <Redirect to="/patient" />;
  if (!firstName || !lastName || !userType) {
    return (
      <Redirect
        to={{
          pathname: '/user-registration',
          state: { wantsToReenterUserInfo: true }
        }}
      />
    );
  }

  return (
    <div className="ExaminerMenu d-flex flex-column align-items-center">
      <h4>LASTen App</h4>
      <p className="m-0">Welcome, {firstName}.</p>
      <p className="m-0">You are registered as an examiner.</p>
      {sessionID ? (
        <div>
          <p>
            Your session ID is <strong>{sessionID}</strong>.
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPatientSessionIDToConnectTo(e.target.value)}
                />
              </div>
              <button className="btn btn-menu btn-outline-primary">Connect to Patient</button>
            </form>
          </div>
        </div>
      ) : (
        <p>
          Connecting to the server<LoadingDots />
        </p>
      )}
      <Link className="mt-3 subtle-label" to="/examiner/tests">
        Can't connect? Click here to conduct an offline test.
      </Link>
      <Link
        className="mt-1 subtle-label"
        to={{
          pathname: '/user-registration',
          state: { wantsToReenterUserInfo: true }
        }}
      >
        Click here to re-enter your user info.
      </Link>

      <InfoAlertModal
        show={showPatientFoundModal}
        hideModal={() => setShowPatientFoundModal(false)}
        label1={<p className="m-0">Patient has been found!</p>}
        label2={
          <p className="m-0">
            Please confirm that their name is{' '}
            <strong>
              {patient.firstName} {patient.lastName}
            </strong>.
          </p>
        }
      />

      <InfoAlertModal
        show={showPatientNotFoundModal}
        hideModal={() => setShowPatientNotFoundModal(false)}
        onExit={() => {
          setPatientSessionIDToConnectTo('');
        }}
        label1={
          <p className="m-0">
            Patient with session ID <strong>{patientSessionIDToConnectTo}</strong> does not exist or has disconnected.
          </p>
        }
      />

      <InfoAlertModal
        show={showInvalidSessionIDModal}
        hideModal={() => setShowInvalidSessionIDModal(false)}
        onExit={() => {
          setPatientSessionIDToConnectTo('');
        }}
        label1={<p className="m-0">Please enter a 5-character session ID.</p>}
      />
    </div>
  );
};

export default ExaminerMenu;
