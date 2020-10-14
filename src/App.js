import React from 'react';
import { Route, HashRouter } from 'react-router-dom'
import AuthForm from './components/AuthForm'
import TestMenu from './components/TestMenu'
import TestDashboard from './views/TestDashboard';
import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div className='App d-flex justify-content-center align-items-center'>
      <HashRouter basename='/'>
        <Route component={AuthForm} exact path='/' />
        <Route component={TestMenu} exact path='/tests' />
        <Route component={TestDashboard} exact path='/tests/A' />
        <Route component={TestDashboard} exact path='/tests/B' />
      </HashRouter>
    </div>
  );
}

export default App;
