import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Dot } from 'react-animated-dots';
import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';

import ws from '../../websocket';

const AuthMenu: React.FC = () => {
  const [ password, setPassword ] = useState('');
  const [ isLoading, setIsLoading ] = useState(false);
  const [ hadEnteredWrongPass, setHadEnteredWrongPass ] = useState(false);

  useEffect(() => {
    // if (ws.connected) ws.disconnect();
  }, []);

  // slightly sus (actually very sus) to put the password here but we can implement real auth later
  const SECRET = 'topsecret88';
  const loggedIn = Cookies.get('loggedIn');

  if (loggedIn) return <Redirect to="/user-registration" />;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password === '') return;
    setIsLoading(true);

    // redirect after random time, to make it seem like theres something going on in a backend >:)
    setTimeout(() => {
      if (password === SECRET) {
        // @ts-ignore
        Cookies.set('loggedIn', true);
      } else {
        setPassword('');
        setHadEnteredWrongPass(true);
      }
      setIsLoading(false);
    }, Math.floor(Math.random() * 1000));
  };

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  let label;
  if (hadEnteredWrongPass && !isLoading) {
    label = (
      <p className="subtle-label" style={{ color: 'red' }}>
        Wrong key!
      </p>
    );
  } else if (isLoading) {
    label = (
      <p className="subtle-label">
        <Dot>•</Dot>
        <Dot>•</Dot>
        <Dot>•</Dot>
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
    <div className="AuthMenu">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Access Key</label>
          <input type="password" className="form-control" onChange={onPasswordChange} value={password} />
          {label}
        </div>
      </form>
    </div>
  );
};

export default AuthMenu;
