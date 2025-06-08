import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/redirect.css';  // assuming this new CSS is saved here

const Redirect = () => {
  const navigate = useNavigate();

  return (
    <div className="redirect-page">
      <div className="container">
        <p className="status-message">
          OOPs....!<br />
          Cannot find Page or the link might have been expired
        </p>
        <button onClick={() => navigate('/')}>Go Home</button>
      </div>
    </div>
  );
};

export default Redirect;
