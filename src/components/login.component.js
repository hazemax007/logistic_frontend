import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";
import { withRouter } from '../common/with-router';
import { Link } from "react-router-dom";


const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
function Login(props) {

  const form = useRef(null);
  const checkBtn = useRef(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
        () => {
          props.router.navigate("/inventory");
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    AuthService.googleLogin()
  }

  /*const googleAuth = () => {
		window.open(
			`${process.env.REACT_APP_API_URL}/auth/google/callback`,
			"_self"
		);
	};*/
  return (
    <>
      <div className="container">
        <section className="content-wrapper">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/24beb847e52b49b4b3529b552cb5ac50eeb50bf10e1039ee82ed1d59f4ffb513?apiKey=2af2801656554d03b3578dfa85dbd1f8&"
            className="hero-image"
            alt="Decorative header image"
          />
          <section className="login-section">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/bc45a8af310ca706c2d9262c94db78dc1643d8ec0793bda359ebbb74acf30257?apiKey=2af2801656554d03b3578dfa85dbd1f8&"
              className="logo"
              alt="Company logo"
            />
            <h2 className="login-header">Log in to your account</h2>
            <p className="welcome-text">
              Welcome back! Please enter your details.
            </p>
            <Form className="login-form" onSubmit={handleLogin} ref={form}>
              <label htmlFor="emailInput" className="form-label">
                Username
              </label>
              <Input
                type="text"
                id="usernameInput"
                className="form-input"
                placeholder="Enter your username"
                aria-label="Enter your username"
                name="password"
                value={username}
                onChange={onChangeUsername}
                validations={[required]}
              />
              <label htmlFor="passwordInput" className="form-label">
                Password
              </label>
              <Input
                type="password"
                id="passwordInput"
                className="form-input"
                placeholder="Enter your password"
                aria-label="Enter your password"
                name="password"
                value={password}
                onChange={onChangePassword}
                validations={[required]}
              />
              <div className="options">
                <div className="remember-me">
                  <input type="checkbox" id="rememberMe" className="checkbox" />
                  <label htmlFor="rememberMe" className="checkbox-label">
                    Remember for 30 days
                  </label>
                </div>
                <Link to={"/forget-password"} className="forgot-password">
                  Forgot password
                </Link>
              </div>
              <button type="submit" className="login-button" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
                Sign in
              </button>
              {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton
            style={{ display: "none" }}
            ref={checkBtn}
          />
            </Form>
            <button className="google-signin" onClick={handleGoogleLogin}>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/f0c03d9bae125d0fca34a9fa19a0f8203e12a0dab6df62aebb0f3ba6c5137e60?apiKey=2af2801656554d03b3578dfa85dbd1f8&"
                className="google-icon"
                alt="Google logo"
              />
              <span>Sign in with Google</span>
            </button>
            <div className="signup-link">
              <p>Don’t have an account?</p>
              <Link to={"/register"} className="signup-button">
                Sign up
              </Link>
            </div>
          </section>
        </section>
      </div>
      <style jsx>{`
        .container {
          background-color: #fff;
          display: flex;
          align-items: center;
          font-size: 16px;
          line-height: 150%;
          justify-content: center;
          padding: 80px 60px;
        }
        @media (max-width: 991px) {
          .container {
            padding: 0 20px;
          }
        }
        .content-wrapper {
          display: flex;
          margin-top: 119px;
          width: 100%;
          max-width: 1057px;
          gap: 20px;
          justify-content: space-between;
        }
        @media (max-width: 991px) {
          .content-wrapper {
            max-width: 100%;
            flex-wrap: wrap;
            margin-top: 40px;
          }
        }
        .hero-image {
          aspect-ratio: 1.54;
          object-fit: auto;
          object-position: center;
          width: 100%;
          margin: auto 0;
        }
        @media (max-width: 991px) {
          .hero-image {
            max-width: 100%;
          }
        }
        .login-section {
          display: flex;
          flex-direction: column;
        }
        .logo {
          aspect-ratio: 1.33;
          object-fit: auto;
          object-position: center;
          width: 68px;
          align-self: center;
        }
        .login-header {
          color: #2b2f38;
          text-align: center;
          margin-top: 24px;
          font: 600 30px/127% Inter, -apple-system, Roboto, Helvetica, sans-serif;
        }
        .welcome-text {
          color: #667085;
          text-align: center;
          font-family: Inter, sans-serif;
          font-weight: 400;
          margin-top: 12px;
        }
        .login-form {
          display: flex;
          flex-direction: column;
        }
        .form-label {
          color: #48505e;
          margin-top: 29px;
          font: 500 14px/143% Inter, -apple-system, Roboto, Helvetica, sans-serif;
        }
        .form-input {
          font-family: Inter, sans-serif;
          border-radius: 8px;
          box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
          border: 1px solid rgba(208, 213, 221, 1);
          background-color: #fff;
          margin-top: 6px;
          color: #667085;
          font-weight: 400;
          padding: 10px 14px;
        }
        .form-label {
          color: #48505e;
          margin-top: 20px;
          font: 500 14px/143% Inter, -apple-system, Roboto, Helvetica, sans-serif;
        }
        .options {
          justify-content: space-between;
          display: flex;
          margin-top: 24px;
          width: 100%;
          gap: 20px;
          font-size: 14px;
          font-weight: 500;
          line-height: 143%;
        }
        .remember-me {
          display: flex;
          gap: 8px;
          color: #48505e;
        }
        .checkbox {
          border-radius: 4px;
          border: 1px solid rgba(208, 213, 221, 1);
          background-color: #fff;
          width: 16px;
          height: 16px;
          margin: auto 0;
        }
        .checkbox-label {
          font-family: Inter, sans-serif;
        }
        .forgot-password {
          color: #1366d9;
          font-family: Inter, sans-serif;
        }
        .login-button {
          font-family: Inter, sans-serif;
          justify-content: center;
          align-items: center;
          border-radius: 4px;
          box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
          border: 1px solid rgba(19, 102, 217, 1);
          background-color: #1366d9;
          margin-top: 24px;
          color: #fff;
          font-weight: 500;
          padding: 10px 18px;
        }
        @media (max-width: 991px) {
          .login-button {
            padding: 0 20px;
          }
        }
        .google-signin {
          justify-content: center;
          border-radius: 4px;
          box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
          border: 1px solid rgba(208, 213, 221, 1);
          background-color: #fff;
          display: flex;
          margin-top: 16px;
          gap: 12px;
          color: #383e49;
          font-weight: 500;
          padding: 10px 16px;
        }
        @media (max-width: 991px) {
          .google-signin {
            padding: 0 20px;
          }
        }
        .google-icon {
          aspect-ratio: 1;
          object-fit: auto;
          object-position: center;
          width: 24px;
        }
        .signup-link {
          justify-content: center;
          display: flex;
          margin-top: 32px;
          gap: 4px;
          font-size: 14px;
          line-height: 143%;
          padding: 0 75px;
        }
        @media (max-width: 991px) {
          .signup-link {
            padding: 0 20px;
          }
        }
        .signup-button {
          color: #1366d9;
          font-family: Inter, sans-serif;
          font-weight: 500;
        }
      `}</style>
    </>
  );
}

export default withRouter(Login);