// VerificationSuccessComponent.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AuthService from '../services/auth.service';

const VerifyUser = () => {
    const { verifyToken } = useParams();
    const [message, setMessage] = useState('');
  
    useEffect(() => {
      AuthService.verifyUser(verifyToken)
        .then(response => {
          setMessage(response.data.message);
          console.log('verified successfully')
        })
        .catch(error => {
          const errorMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setMessage(errorMessage);
        });
    }, [verifyToken]);
  
    return (
      <div className="container">
        <h3>Verification Result</h3>
        <p>User Account verified successfully</p>
      </div>
    );
};

export default VerifyUser;
