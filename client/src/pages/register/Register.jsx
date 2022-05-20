import { useRef } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import './register.css';

function Register() {
  const email = useRef();
  const username = useRef();
  const password = useRef();
  const passwordAgain = useRef();

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.current.value !== passwordAgain.current.value) {
      password.current.setCustomValidity("password don't match.");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };

      console.log('what happened');

      try {
        await axios.post('/auth/register', user);
      } catch (error) {
        console.log(error);
      }
      navigate("/login");
    }
  };

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
              placeholder="Username"
              ref={username}
              required
              className="loginInput"
            />
            <input
              placeholder="Email"
              ref={email}
              type="email"
              required
              className="loginInput"
            />
            <input
              placeholder="Password"
              ref={password}
              minLength={6}
              type="password"
              required
              className="loginInput"
            />
            <input
              placeholder="Password Again"
              ref={passwordAgain}
              minLength={6}
              type="password"
              required
              className="loginInput"
            />
            <button type="submit" className="loginButton">
              Sign Up
            </button>
          </form>
          <div className="loginRightMini">
          <button className="loginRegisterButton" onClick={()=>{navigate("/login")}}>
              Already have an Account?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
