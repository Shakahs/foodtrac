import React from 'react';
import './landing.scss';

const LandingPage = () => (
  <div className="landing" >
    <div className="landgingLogoContainer">
      <img
        className="landingLogo"
        src="http://storage.googleapis.com/foodtrac/foodtracpin.png"
        alt=""
      />
      <br />
      <div>foodtrac</div>
    </div>
  </div>
);

export default LandingPage;
