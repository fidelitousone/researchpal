import * as React from 'react';
import GoogleAuth from './GoogleButton';
import FacebookAuth from './FacebookButton';
import MicrosoftAuth from './MicrosoftButton';
import 'bootstrap/dist/css/bootstrap.css';

export default function Landing() {
  return (
    <div className="Landing">
      <div className="jumbotron">
        <h1>ResearchPal</h1>
        <p>The simple research organization tool, designed by researchers for researchers</p>
      </div>
      <h2 align="center">Log in below:</h2>
      <div className="d-flex justify-content-center">
        <div className="align-self-center px-2">
          <GoogleAuth />
        </div>
        <div className="align-self-center px-2">
          <MicrosoftAuth />
        </div>
        <div className="align-self-center px-2">
          <FacebookAuth />
        </div>
      </div>
    </div>
  );
}
