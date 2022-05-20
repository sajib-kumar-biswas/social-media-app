import { useContext, useRef } from 'react';
import './login.css';
import loginCall from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import { CircularProgress } from '@material-ui/core';
import {useNavigate} from 'react-router-dom';

function Login() {
  const email = useRef();
  const password = useRef();
  let navigate = useNavigate();

  const { user, isFetching, dispatch } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
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
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="secondary" size={20} />
              ) : (
                'Log In'
              )}
            </button>
            <span className="loginForget">Forgot Password?</span>
          </form>
          <div className="loginRightMini">
            <button className="loginRegisterButton" onClick={()=>{navigate("/register")}}>
              Create a New Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
