import React from 'react';
import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route } from 'react-router-dom'
import AuthForm from './components/AuthForm'
import TestMenu from './components/TestMenu'

function App() {
  return (
    <div className='App container d-flex justify-content-center align-items-center'>
      <div id='options' className='d-flex flex-column align-items-center p-5'>
        <h4>LAST App</h4>
        {/* <br /> */}
        <Route component={AuthForm} exact path='/' />
        <Route component={TestMenu} exact path='/test-menu' />
      </div>
    </div>
  );
}

export default App;
