import React from 'react';
import VerifyEmailSvg from '../../assets/email.svg';
import VerifyEmailForm from '../../features/authentication/components/VerifyEmailForm';

function VerifyEmailPage() {
    return (
        <div className="page page__public page__auth page__auth__verifyEmail">
            <div className="page__auth__section page__auth__section__left">
                <img src={VerifyEmailSvg} className="page__auth__illustration illustration__400"></img>
            </div>
            <div className="page__auth__section page__auth__section__right">
                <VerifyEmailForm></VerifyEmailForm>
            </div>
        </div>
    );
}

export default VerifyEmailPage;