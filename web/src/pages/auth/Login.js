import React from 'react';
import LoginForm from '../../features/authentication/components/LoginForm';
import './AuthPage.css';

function Login() {
    return (
        <div className="page__auth page__auth__login">
            <LoginForm></LoginForm>
        </div>
    )
}

export default Login;