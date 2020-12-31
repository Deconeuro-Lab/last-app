import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import YesNoConfirmModal from '../../components/YesNoConfirmModal/YesNoConfirmModal';
import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';

import ws from '../../websocket';

type Props = any;

const UserRegistration: React.FC<Props> = (props) => {
  const [ toUserMenus, setToUserMenus ] = useState(false);
  const [ toAuth, setToAuth ] = useState(false);
  const [ showModal, setShowModal ] = useState(false);
  const [ userType, setUserType ] = useState('examiner');
  const [ userFirstName, setUserFirstName ] = useState('');
  const [ userLastName, setUserLastName ] = useState('');
  const [ hadSubmittedEmptyForm, setHadSubmittedEmptyForm ] = useState(false);

  useEffect(() => {
    setUserFirstName(prevUserFirstName || '');
    setUserLastName(prevUserLastName || '');
    setUserType(prevUserType || 'examiner');
  }, []);

  const loggedIn = Cookies.get('loggedIn');
  const prevUserFirstName = Cookies.get('userFirstName');
  const prevUserLastName = Cookies.get('userLastName');
  const prevUserType = Cookies.get('userType');

  // redirect logic:

  const userWantsToReenterUserInfo = (): boolean => {
    return props.location.state && props.location.state.wantsToReenterUserInfo;
  };

  const userInfoIsComplete = (): boolean => {
    // @ts-ignore
    return prevUserFirstName && prevUserLastName && prevUserType;
  };

  const signOut = () => {
    Cookies.remove('loggedIn');
    Cookies.remove('userFirstName');
    Cookies.remove('userLastName');
    Cookies.remove('userType');
    Cookies.remove('noPulse');
    setToAuth(true);
  };

  if (!loggedIn || toAuth) return <Redirect to="/" />;
  if (toUserMenus || (!userWantsToReenterUserInfo() && userInfoIsComplete()))
    return <Redirect to={`/${prevUserType}`} />;

  // form control:

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userFirstName && userLastName && userType) {
      Cookies.set('userFirstName', userFirstName.trim());
      Cookies.set('userLastName', userLastName.trim());
      Cookies.set('userType', userType);
      setToUserMenus(true);
      setHadSubmittedEmptyForm(false);
    } else {
      setHadSubmittedEmptyForm(true);
    }
  };

  const onUserTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserType(e.target.value);
  };

  const onUserFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserFirstName(e.target.value);
  };

  const onUserLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserLastName(e.target.value);
  };

  // form labels:

  let userTypeLabel = '';
  if (userType === 'examiner') userTypeLabel = 'I am an...';
  else userTypeLabel = 'I am a...';

  let dangerLabel: JSX.Element;
  if (hadSubmittedEmptyForm) {
    dangerLabel = (
      <p style={{ color: 'red' }} className="subtle-label">
        Please complete the form.
      </p>
    );
  } else {
    dangerLabel = (
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
        {dangerLabel}
        <button className="btn btn-menu btn-outline-primary">Register</button>
      </form>
      <p className="btn w-100 subtle-label" onClick={() => setShowModal(true)}>
        Click here to sign out and erase session history.
      </p>

      <YesNoConfirmModal
        show={showModal}
        hideModal={() => setShowModal(false)}
        text1="Are you sure you want to sign out?"
        action={signOut}
      />
    </div>
  );
};

export default UserRegistration;
