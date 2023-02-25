import React from 'react';
import SignUpForm from '../../features/authentication/components/SignupForm';
import './AuthPage.css';

function Signup() {
    return (
        <div className="page__auth page__auth__signUp">
            <SignUpForm></SignUpForm>
        </div>
    )
}

export default Signup;