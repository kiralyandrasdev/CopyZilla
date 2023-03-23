import React from 'react';
import SignUpForm from '../../features/authentication/components/SignupForm';
import './AuthPage.css';

function Signup() {
    return (
        <div className="page__auth page__auth__signUp">
            <SignUpForm></SignUpForm>
            <p className="description authCaption">
                By creating an account, you agree to our <a className="authCaption" href="/termsOfService" target="_blank">Terms of Service</a> and <a className="authCaption" href="/privacyPolicy" target="_blank">Privacy Policy</a>
            </p>
        </div>
    )
}

export default Signup;