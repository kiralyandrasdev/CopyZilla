import React from 'react';
import SignInSvg from '../../assets/sign_in.svg';
import LoginForm from '../../features/authentication/components/LoginForm';
import './AuthPage.css';

function Login() {
    return (
        <div className="page page__public page__auth page__auth__login">
            <div className="page__auth__section page__auth__section__left">
                <img src={SignInSvg} className="page__auth__illustration"></img>
            </div>
            <div className="page__auth__section page__auth__section__right">
                <LoginForm></LoginForm>
            </div>
        </div>
    )
}

export default Login;