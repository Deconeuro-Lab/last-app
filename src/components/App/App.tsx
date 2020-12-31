import React from 'react';
import { Route, HashRouter } from 'react-router-dom';
import Auth from '../../views/AuthMenu/AuthMenu';
import UserRegistration from '../../views/UserRegistration/UserRegistration';
import ExaminerMenu from '../../views/ExaminerMenu/ExaminerMenu';
import PatientMenu from '../../views/PatientMenu/PatientMenu';
import ExaminerTests from '../../views/ExaminerTests/ExaminerTests';
import TestDashboard from '../../views/TestDashboard/TestDashboard';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
  return (
    <div className="App d-flex justify-content-center align-items-center">
      <HashRouter basename="/">
        <Route component={Auth} exact path="/" />
        <Route component={UserRegistration} exact path="/user-registration" />
        <Route component={PatientMenu} exact path="/patient" />
        <Route component={ExaminerMenu} exact path="/examiner" />
        <Route component={ExaminerTests} exact path="/examiner/tests" />
        <Route component={TestDashboard} exact path="/examiner/tests/A" />
        <Route component={TestDashboard} exact path="/examiner/tests/B" />
      </HashRouter>
    </div>
  );
};

export default App;
