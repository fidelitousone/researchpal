import * as React from 'react';
import GoogleLogin from 'react-google-login';
import Socket from './Socket';
import { useHistory  } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

export default function GoogleAuth() {
  const history = useHistory();
  function handleSubmit(response) {
    Socket.emit('new_google_user', {
      response,
    });
    console.log('Sent new google user to server!');

    Socket.emit('login_request', {
      email: response.profileObj.email,
    });

    Socket.on('login_response', (data) => {
      console.log(data);
    });
    history.push("/home");
  }
  
  function responseGoogleSuccess(response) {
    console.log('Success:', response);
    handleSubmit(response);
  }

  function responseGoogleFailure(response) {
    console.log('FAIL:', response);
  }

  return (
    <GoogleLogin
      clientId="392545713863-91sppbihnj638rth8gg7upfvjoug9s98.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={responseGoogleSuccess}
      onFailure={responseGoogleFailure}
      cookiePolicy="single_host_origin"
    />
  );
}
