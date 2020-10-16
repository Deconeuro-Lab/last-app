import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Dot } from 'react-animated-dots';
import 'bootstrap/dist/css/bootstrap.min.css';

function Auth() {

  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hadEnteredWrongPass, setHadEnteredWrongPass] = useState(false);
  const [toUserRegistration, setToUserRegistration] = useState(false);

  const SECRET = "topsecret88";

  if (toUserRegistration) {
    return <Redirect to={{
      pathname: "/user-registration",
      state: { isAuthorized: true }
    }} />
  }

  const onSubmit = e => {
    e.preventDefault();
    
    if (password === '') {
      return;
    }
    
    setIsLoading(true);
    // redirect after random time, to make it seem like theres something going on in a backend >:)
    setTimeout(() => {
      if (password === SECRET) {
        setToUserRegistration(true);
      }
      else {
        setPassword('');
        setHadEnteredWrongPass(true);
      }
      setIsLoading(false);
    }, Math.floor(Math.random() * 1000));
  }

  const onPasswordChange = e => {
    setPassword(e.target.value);
  }

  let label;
  if (hadEnteredWrongPass && !isLoading) {
    label = <p className="subtle-label" >Wrong key!</p>;
  }
  else if (isLoading) {
    label = <p className="subtle-label">
              <Dot>•</Dot>
              <Dot>•</Dot>
              <Dot>•</Dot>
            </p>;
  }
  else {
    label = <p className="subtle-label" style={{visibility: 'hidden'}}>a</p>
  }

  return (
    <div className="Auth">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>
            Access Key
          </label>
          <input type="password" className="form-control" onChange={onPasswordChange} value={password} />
          {label}
        </div>
      </form>
    </div>
  );
}

export default Auth;
