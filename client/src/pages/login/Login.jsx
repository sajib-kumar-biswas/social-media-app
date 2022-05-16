import { useContext, useRef } from 'react';
import './login.css';
import loginCall from '../../apiCalls';
import {AuthContext} from '../../context/AuthContext'
import { CircularProgress } from '@material-ui/core';

function Login() {
  const email = useRef();
  const password = useRef();

  const {user,isFetching,error,dispatch} = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginCall({email: email.current.value, password: password.current.value},dispatch)
  };

  console.log(user);

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <div className="loginLogo">Look</div>
          <div className="loginDesc">
            Connect with friends and the world around you on Look.
          </div>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSubmit}>
            <input
              ref={email}
              placeholder="Email"
              type="email"
              required
              className="loginInput"
            />
            <input
              ref={password}
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
            />
            <button className="loginButton" type='submit' disabled={isFetching}>
              {isFetching ? <CircularProgress color='white' size={20} /> : "Log In"}
            </button>
            <span className="loginForget">Forgot Password?</span>
            <button className="loginRegisterButton" disabled={isFetching}>
            {isFetching ? <CircularProgress color='white' size={20} /> : "Create a New Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
