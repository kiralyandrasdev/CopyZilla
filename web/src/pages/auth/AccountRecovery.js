import React from 'react';
import ForgotPasswordSvg from '../../assets/forgot_password.svg';
import { RecoveryForm } from '../../features';
import './AccountRecovery.css';

export default function AccountRecovery() {
    return (
        <div className="page page__public page__auth page__auth__login">
            <div className="page__auth__section page__auth__section__left">
                <img src={ForgotPasswordSvg} className="page__auth__illustration illustration__400"></img>
            </div>
            <div className="page__auth__section page__auth__section__right">
                <RecoveryForm></RecoveryForm>
            </div>
        </div>
    )
}