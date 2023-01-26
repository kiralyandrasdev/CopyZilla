import React from 'react';
import SignInSvg from '../../assets/sign_in.svg';
import SignUpForm from '../../features/authentication/components/SignupForm';
import './AuthPage.css';

function Signup() {
    return (
        <div className="page page__public page__auth page__auth__signUp">
            <div className="page__auth__section page__auth__section__left">
                <img src={SignInSvg} className="page__auth__illustration illustration__400"></img>
            </div>
            <div className="page__auth__section page__auth__section__right">
                <SignUpForm></SignUpForm>
            </div>
        </div>
    )
}

export default Signup;