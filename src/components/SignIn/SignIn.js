import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import '../../VocaCoord.css';
import slide from '../../assets/VCLogin.svg';

const SignIn = ({ authenticated }) => {
  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false
    }
  };
  return authenticated ? (
    <Redirect to="/classrooms" />
  ) : (
    <div>
      <img src={slide} className="slide" alt="slide" />
      <div className="login">
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
    </div>
  );
};

export default withRouter(SignIn);
