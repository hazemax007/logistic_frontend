import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


function ResetPassword() {

  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the resetToken from the query parameters in the URL
    const params = new URLSearchParams(window.location.search);
    const resetToken = params.get("resetToken");

    try {
      const response = await axios.post(
        `http://localhost:8080/api/auth/reset-password?resetToken=${resetToken}`,
        { password }
      );

      if (response.data.success) {
        alert("Password changed Ok");
        setSuccess(true)
        setTimeout(() => {
          navigate("/login");
        }, 2000);  // Wait for 2 seconds before redirecting
      } else {
        setError(response.data.msg);
      }
    } catch (error) {
      setError("Failed to reset password. Please try again.");
    }
  };
  return (
    <>
      <div className="div">
        <div className="div-2">
          <img
            loading="lazy"
            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/24beb847e52b49b4b3529b552cb5ac50eeb50bf10e1039ee82ed1d59f4ffb513?apiKey=2af2801656554d03b3578dfa85dbd1f8&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/24beb847e52b49b4b3529b552cb5ac50eeb50bf10e1039ee82ed1d59f4ffb513?apiKey=2af2801656554d03b3578dfa85dbd1f8&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/24beb847e52b49b4b3529b552cb5ac50eeb50bf10e1039ee82ed1d59f4ffb513?apiKey=2af2801656554d03b3578dfa85dbd1f8&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/24beb847e52b49b4b3529b552cb5ac50eeb50bf10e1039ee82ed1d59f4ffb513?apiKey=2af2801656554d03b3578dfa85dbd1f8&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/24beb847e52b49b4b3529b552cb5ac50eeb50bf10e1039ee82ed1d59f4ffb513?apiKey=2af2801656554d03b3578dfa85dbd1f8&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/24beb847e52b49b4b3529b552cb5ac50eeb50bf10e1039ee82ed1d59f4ffb513?apiKey=2af2801656554d03b3578dfa85dbd1f8&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/24beb847e52b49b4b3529b552cb5ac50eeb50bf10e1039ee82ed1d59f4ffb513?apiKey=2af2801656554d03b3578dfa85dbd1f8&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/24beb847e52b49b4b3529b552cb5ac50eeb50bf10e1039ee82ed1d59f4ffb513?apiKey=2af2801656554d03b3578dfa85dbd1f8&"
            className="img"
          />
          <div className="div-3">
            <img
              loading="lazy"
              srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/bc45a8af310ca706c2d9262c94db78dc1643d8ec0793bda359ebbb74acf30257?apiKey=2af2801656554d03b3578dfa85dbd1f8&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/bc45a8af310ca706c2d9262c94db78dc1643d8ec0793bda359ebbb74acf30257?apiKey=2af2801656554d03b3578dfa85dbd1f8&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/bc45a8af310ca706c2d9262c94db78dc1643d8ec0793bda359ebbb74acf30257?apiKey=2af2801656554d03b3578dfa85dbd1f8&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/bc45a8af310ca706c2d9262c94db78dc1643d8ec0793bda359ebbb74acf30257?apiKey=2af2801656554d03b3578dfa85dbd1f8&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/bc45a8af310ca706c2d9262c94db78dc1643d8ec0793bda359ebbb74acf30257?apiKey=2af2801656554d03b3578dfa85dbd1f8&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/bc45a8af310ca706c2d9262c94db78dc1643d8ec0793bda359ebbb74acf30257?apiKey=2af2801656554d03b3578dfa85dbd1f8&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/bc45a8af310ca706c2d9262c94db78dc1643d8ec0793bda359ebbb74acf30257?apiKey=2af2801656554d03b3578dfa85dbd1f8&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/bc45a8af310ca706c2d9262c94db78dc1643d8ec0793bda359ebbb74acf30257?apiKey=2af2801656554d03b3578dfa85dbd1f8&"
              className="img-2"
            />
            <div className="div-4">Reset Password</div>
            <div className="div-5">
              Set the new password for your account so you can login and access
              all features.
            </div>
            <form onSubmit={handleSubmit}>
            <div className="div-6">Password</div>
            <input
            type="password"
            className="div-7"
            placeholder="Enter your new password"
            value={password}
            onChange={handlePasswordChange}
            required>
            </input>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">Password updated successfully!</div>}
            <button 
            type="submit"
            className="div-10"
            >Update Password</button>
            </form>
            <div className="div-11">
              <div className="div-12">Don’t have an account?</div>
              <div className="div-13">Sign up</div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .div {
          background-color: #fff;
          display: flex;
          align-items: center;
          font-size: 16px;
          line-height: 143%;
          justify-content: center;
          padding: 80px 60px;
        }
        @media (max-width: 991px) {
          .div {
            padding: 0 20px;
          }
        }
        .div-2 {
          display: flex;
          margin-top: 119px;
          width: 100%;
          max-width: 1057px;
          gap: 20px;
          justify-content: space-between;
        }
        @media (max-width: 991px) {
          .div-2 {
            max-width: 100%;
            flex-wrap: wrap;
            margin-top: 40px;
          }
        }
        .img {
          aspect-ratio: 1.54;
          object-fit: auto;
          object-position: center;
          width: 100%;
          margin: auto 0;
        }
        @media (max-width: 991px) {
          .img {
            max-width: 100%;
          }
        }
        .div-3 {
          display: flex;
          flex-direction: column;
        }
        .img-2 {
          aspect-ratio: 1.33;
          object-fit: auto;
          object-position: center;
          width: 68px;
          align-self: center;
        }
        .div-4 {
          color: var(--Grey-grey-900, #2b2f38);
          text-align: center;
          margin-top: 24px;
          font: 600 30px/127% Inter, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .div-5 {
          color: var(--Gray-500, #667085);
          text-align: center;
          font-family: Open Sans, sans-serif;
          font-weight: 400;
          line-height: 24px;
          letter-spacing: 0.15px;
          margin-top: 12px;
        }
        .div-6 {
          color: var(--Grey-grey-700, #48505e);
          margin-top: 5px;
          font: 500 14px Inter, sans-serif;
        }
        .div-7 {
          font-family: Inter, sans-serif;
          border-radius: 8px;
          box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
          border-color: rgba(208, 213, 221, 1);
          border-style: solid;
          border-width: 1px;
          background-color: var(--White, #fff);
          margin-top: 6px;
          color: var(--Grey-grey-500, #667085);
          font-weight: 400;
          white-space: nowrap;
          line-height: 150%;
          justify-content: center;
          padding: 10px 14px;
        }
        @media (max-width: 991px) {
          .div-7 {
            white-space: initial;
          }
        }
        .div-8 {
          color: var(--Grey-grey-700, #48505e);
          margin-top: 20px;
          font: 500 14px Inter, sans-serif;
        }
        .div-9 {
          font-family: Inter, sans-serif;
          border-radius: 8px;
          box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
          border-color: rgba(208, 213, 221, 1);
          border-style: solid;
          border-width: 1px;
          background-color: var(--White, #fff);
          margin-top: 6px;
          color: var(--Grey-grey-500, #667085);
          font-weight: 400;
          white-space: nowrap;
          line-height: 150%;
          justify-content: center;
          padding: 10px 14px;
        }
        @media (max-width: 991px) {
          .div-9 {
            white-space: initial;
          }
        }
        .div-10 {
          font-family: Inter, sans-serif;
          justify-content: center;
          align-items: center;
          border-radius: 4px;
          box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
          border-color: rgba(19, 102, 217, 1);
          border-style: solid;
          border-width: 1px;
          background-color: var(--Primary-primary-600, #1366d9);
          margin-top: 24px;
          color: var(--White, #fff);
          font-weight: 500;
          line-height: 150%;
          padding: 10px 18px;
        }
        @media (max-width: 991px) {
          .div-10 {
            padding: 0 20px;
          }
        }
        .div-11 {
          justify-content: center;
          display: flex;
          margin-top: 136px;
          gap: 4px;
          font-size: 14px;
          padding: 0 75px;
        }
        @media (max-width: 991px) {
          .div-11 {
            margin-top: 40px;
            padding: 0 20px;
          }
        }
        .div-12 {
          color: var(--Grey-grey-500, #667085);
          font-family: Inter, sans-serif;
          font-weight: 400;
        }
        .div-13 {
          color: var(--Primary-primary-600, #1366d9);
          font-family: Inter, sans-serif;
          font-weight: 500;
        }
      `}</style>
    </>
  );
}


export default ResetPassword;