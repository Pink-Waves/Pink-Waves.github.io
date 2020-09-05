import React, {useState} from 'react';
import './App.css';
import Welcome from './components/Welcome';
import Registration from './components/Registration';
import Login from './components/Login';
import Custom from './components/BirdCustom';
import Address from './components/Address';
import Main from './mainComponents/Main';
import { BrowserRouter as Router, Link} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import EmailConfirmation from './components/EmailConfirmation';
import EmailVerified from './components/EmailVerified';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import PasswordConfirmed from './components/PasswordConfirmed';
import Oops from './components/Oops';
import Resources from './mainComponents/Resources';
import ChangePassword from './mainComponents/ChangePassword';

function App() {

  return (
    <Router>
    <div className="App">
     <Route path="/" exact render={
        () => {
          return (
            <div>
          <Welcome />
          <Link to = '/register' >
          <button>Sign Up</button>
          </Link>
          <Link to = '/login'>
          <button>Login</button>
          </Link>
          </div>)
        }
      } />
      <Route path="/register" exact strict render={
        () => {
          return (<Registration />)
        }
      } />
      <Route path="/login" exact strict render={
        () => {
          return (<Login/>)
        }
      } />
      <Route path="/emailconfirmation" exact strict render={
        () => {
          return (<EmailConfirmation />)
        }
      } />
      <Route path="/emailverified" exact strict render={
        () => {
          return (<EmailVerified />)
        }
      } />
      <Route path="/forgotpassword" exact strict render={
        () => {
          return (<ForgotPassword />)
        }
      } />
      <Route path="/resetpassword" exact strict render={
        () => {
          return (<ResetPassword />)
        }
      } />
      <Route path="/passwordconfirmed" exact strict render={
        () => {
          return (<PasswordConfirmed />)
        }
      } />
      <Route path="/oops" exact strict render={
        () => {
          return (<Oops />)
        }
      } />
      <Route path="/main" exact strict render={
        () => {
          return (<Main />)
        }
      } />
      <Route path="/resources" exact strict render={
        () => {
          return (<Resources />)
        }
      } />
      <Route path="/changepassword" exact strict render={
        () => {
          return (<ChangePassword />)
        }
      } />
    </div>
    </Router>
  );
}

export default App;
