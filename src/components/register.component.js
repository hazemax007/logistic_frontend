import React, { useState } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";
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

const vemail = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};
function Register() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.validateAll();

    if (checkBtn.context._errors.length === 0) {
      AuthService.register(username, email, password).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setSuccessful(false);
          setMessage(resMessage);
        }
      );
    }
  };

  let form;
  let checkBtn;

  const googleAuth = () => {
		window.open(
			`${process.env.REACT_APP_API_URL}/auth/google/callback`,
			"_self"
		);
	};

  return (
    <>
      <section className="container">
        <article className="wrapper">
          <div className="image-container">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/24beb847e52b49b4b3529b552cb5ac50eeb50bf10e1039ee82ed1d59f4ffb513?apiKey=2af2801656554d03b3578dfa85dbd1f8&"
              className="main-image"
              alt="Main visual"
            />
          </div>
          <div className="form-container">
            <Form className="form" onSubmit={handleRegister}
            ref={(c) => {
              form = c;}}>
              {!successful && (
              <div>
                <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/bc45a8af310ca706c2d9262c94db78dc1643d8ec0793bda359ebbb74acf30257?apiKey=2af2801656554d03b3578dfa85dbd1f8&"
                className="logo-image"
                alt="Company logo"
              />
              <h1 className="title">Create an account</h1>
              <p className="subtitle">Start your 30-day free trial.</p>
              <label htmlFor="nameInput" className="form-label">
                Name*
              </label>
              <Input
                type="text"
                id="nameInput"
                className="form-input"
                placeholder="Enter your name"
                aria-label="Enter your name"
                name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required, vusername]}
              />
              <label htmlFor="emailInput" className="form-label">
                Email*
              </label>
              <Input
                type="email"
                id="emailInput"
                className="form-input"
                placeholder="Enter your email"
                aria-label="Enter your email"
                name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, vemail]}
              />
              <label htmlFor="passwordInput" className="form-label">
                Password*
              </label>
              <Input
                type="password"
                id="passwordInput"
                className="form-input"
                placeholder="Create a password"
                aria-label="Create a password"
                name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
              />
              <p className="form-hint">Must be at least 8 characters.</p>
              <button type="submit" className="submit-button">
                Get started
              </button>
              <div className="alternative">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/93f0f51c724f97a98ae2b72c9e2ceb464563f6e8f5b4e9546a977559f72be61a?apiKey=2af2801656554d03b3578dfa85dbd1f8&"
                  className="google-icon"
                  alt=""
                />
                <button type="button" className="google-signup" onClick={googleAuth}>
                  Sign up with Google
                </button>
              </div>
              <p className="login-prompt">
                Already have an account?{" "}
                <Link to={"/login"} className="login-link">
                  Log in
                </Link>
              </p>
              </div>
              )}
              {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton
            style={{ display: "none" }}
            ref={(c) => {
              checkBtn = c;
            }}
          />
            </Form>
          </div>
        </article>
      </section>
      <style jsx>{`
        .container {
          background-color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 80px 60px;
        }
        @media (max-width: 991px) {
          .container {
            padding: 0 20px;
          }
        }
        .wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          width: 100%;
          max-width: 1036px;
          margin-top: 83px;
        }
        @media (max-width: 991px) {
          .wrapper {
            max-width: 100%;
            margin-top: 40px;
          }
        }
        .image-container {
          width: 62%;
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }
        @media (max-width: 991px) {
          .image-container {
            width: 100%;
          }
        }
        .main-image {
          aspect-ratio: 1.54;
          object-fit: cover;
          width: 100%;
          margin: auto;
        }
        @media (max-width: 991px) {
          .main-image {
            max-width: 100%;
            margin-top: 40px;
          }
        }
        .form-container {
          width: 38%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        @media (max-width: 991px) {
          .form-container {
            width: 100%;
          }
        }
        .form {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: 500px;
        }
        .logo-image {
          aspect-ratio: 1.33;
          object-fit: cover;
          width: 68px;
          margin-bottom: 24px;
        }
        .title {
          color: #101828;
          text-align: center;
          font-size: 30px;
          font-weight: 600;
          line-height: 1.27;
        }
        .subtitle {
          color: #667085;
          text-align: center;
          font-weight: 400;
          margin-top: 12px;
        }
        .form-label {
          color: #48505e;
          font-size: 14px;
          font-weight: 500;
          margin-top: 20px;
          width: 100%;
        }
        .form-input {
          width: 100%;
          padding: 10px 14px;
          margin-top: 6px;
          border: 1px solid #d0d5dd;
          border-radius: 8px;
          box-shadow: 0 1px 2px rgba(16, 24, 40, 0.05);
          background-color: #fff;
          color: #667085;
        }
        .form-hint {
          color: #667085;
          font-size: 14px;
          font-weight: 400;
          margin-top: 6px;
        }
        .submit-button {
          background-color: #1366d9;
          color: #fff;
          font-weight: 500;
          padding: 10px 18px;
          margin-top: 23px;
          border: 1px solid #1366d9;
          border-radius: 4px;
          box-shadow: 0 1px 2px rgba(16, 24, 40, 0.05);
          cursor: pointer;
        }
        .alternative {
          display: flex;
          align-items: center;
          padding: 10px 16px;
          gap: 12px;
          margin-top: 16px;
          color: #48505e;
          font-weight: 500;
          background-color: #fff;
          border: 1px solid #d0d5dd;
          border-radius: 4px;
          box-shadow: 0 1px 2px rgba(16, 24, 40, 0.05);
          cursor: pointer;
        }
        .google-icon {
          aspect-ratio: 1;
          width: 24px;
        }
        .google-signup {
          border: none;
          background: none;
          color: inherit;
          font: inherit;
          line-height: inherit;
          cursor: pointer;
        }
        .login-prompt {
          margin-top: 32px;
          font-size: 14px;
          line-height: 1.43;
          text-align: center;
        }
        .login-link {
          color: #0f50aa;
          font-weight: 500;
          text-decoration: none;
        }
      `}</style>
    </>
  );
}

export default Register;