import React from 'react';
import { Route, HashRouter } from 'react-router-dom'
import Auth from './views/Auth'
import UserRegistration from './views/UserRegistration'
import TestMenu from './views/TestMenu'
import TestDashboard from './views/TestDashboard';
import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div className='App d-flex justify-content-center align-items-center'>
      <HashRouter basename='/'>
        <Route component={Auth} exact path='/' />
        <Route component={UserRegistration} exact path='/user-registration' />
        <Route component={TestMenu} exact path='/tests' />
        <Route component={TestDashboard} exact path='/tests/A' />
        <Route component={TestDashboard} exact path='/tests/B' />
      </HashRouter>
    </div>
  );
}

export default App;
