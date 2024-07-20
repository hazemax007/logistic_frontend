import React, { useState } from "react";
import axios from "axios";
import authService from "../services/auth.service";
import { Link } from "react-router-dom";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/auth/forget-password", { email });
      if (response.status === 200) {
        // Handle success
        alert("Reset Link sent to your email");
      } else {
        // Handle other status codes or errors
        alert(response.data.msg || "Failed to submit. Please try again later.");
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle network error or other exceptions
      alert("Failed to submit. Please try again later.");
    }
  };

  const handleVerificationCodeSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/verifyCode", { email, verificationCode });
      if (response.status === 200) {
        // Handle success, e.g., redirect to password reset page
        alert("Verification successful. Redirecting to reset password page.");
      } else {
        // Handle other status codes or errors
        alert(response.data.msg || "Failed to verify code. Please try again later.");
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle network error or other exceptions
      alert("Failed to verify code. Please try again later.");
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
            <div className="div-4">Forgot Password</div>
            <div className="div-5">
              
                <>
                  Enter your email for the verification process, we will send a 4-digit code to your email.
                </>
             
            </div>
            
              <>
                <form onSubmit={handleSubmitEmail}>
                  <div className="div-6">Email</div>
                  <input
                    type="email"
                    className="div-7"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="div-8">
                    Continue
                  </button>
                </form>
                <div className="div-9">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/8d63aabea8af88c598c84510b30907e49d1cdf48e2d91078d6cf8fcf57c54ca2?apiKey=2af2801656554d03b3578dfa85dbd1f8&"
                    className="img-3"
                  />
                  <div className="div-10">Sign in with Google</div>
                </div>
              </>
            
              <div className="div-11">
                <div className="div-12">Already have an account?</div>
                <Link to={"/login"} className="div-13">Log in</Link>
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
          line-height: 150%;
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
          color: #828282;
          text-align: center;
          font-family: Open Sans, sans-serif;
          font-weight: 400;
          line-height: 24px;
          letter-spacing: 0.15px;
          margin-top: 12px;
        }
        .div-6 {
          color: var(--Grey-grey-700, #48505e);
          margin-top: 86px;
          font: 500 14px/143% Inter, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        @media (max-width: 991px) {
          .div-6 {
            margin-top: 40px;
          }
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
          justify-content: center;
          padding: 10px 14px;
        }
        .div-8 {
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
          white-space: nowrap;
          padding: 10px 18px;
        }
        @media (max-width: 991px) {
          .div-8 {
            white-space: initial;
            padding: 0 20px;
          }
        }
        .div-9 {
          justify-content: center;
          border-radius: 4px;
          box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
          border-color: rgba(208, 213, 221, 1);
          border-style: solid;
          border-width: 1px;
          background-color: var(--White, #fff);
          display: flex;
          margin-top: 16px;
          gap: 12px;
          color: var(--Grey-grey-800, #383e49);
          font-weight: 500;
          padding: 10px 16px;
        }
        @media (max-width: 991px) {
          .div-9 {
            padding: 0 20px;
          }
        }
        .img-3 {
          aspect-ratio: 1;
          object-fit: auto;
          object-position: center;
          width: 24px;
        }
        .div-10 {
          font-family: Inter, sans-serif;
        }
        .div-11 {
          justify-content: center;
          display: flex;
          margin-top: 86px;
          gap: 4px;
          font-size: 14px;
          line-height: 143%;
          padding: 0 72px;
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
          color: var(--Primary-primary-700, #0f50aa);
          font-family: Inter, sans-serif;
          font-weight: 500;
        }
      `}</style>
    </>
  );
}

export default ForgetPassword;






