import React from 'react'
import LoginForm from '../features/authentication/LoginForm';
import './View.css';

function SignedOutView() {
    return (
        <div className="view view__signedOut">
            <h2>Jelentkezz be a fiókodba</h2>
            <LoginForm />
        </div>
    );
}

export default SignedOutView;