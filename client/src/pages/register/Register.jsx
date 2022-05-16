import './register.css';

function Register() {
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
          <div className="loginBox">
            <input placeholder="Username" className="loginInput" />
            <input placeholder="Email" className="loginInput" />
            <input placeholder="Password" className="loginInput" />
            <input placeholder="Password Again" className="loginInput" />
            <button className="loginButton">Sign Up</button>
            <button className="loginRegisterButton">
              Already have an Account?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
