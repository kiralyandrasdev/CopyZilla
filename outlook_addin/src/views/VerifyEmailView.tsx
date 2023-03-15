import React from 'react'
import styles from './VerifyEmailView.module.css';
import EmailSvg from '../assets/email.svg';
import TextButton from '../components/TextButton';
import { getAuth } from '@firebase/auth';

function VerifyEmailView() {
    return (
        <div className={styles.view}>
            <img src={EmailSvg} alt="" className='illustration' />
            <h5>Email verification required</h5>
            <p className="">
                We've sent you an email with a link to verify your account. Please click on the link to verify your email address.
            </p>
            <TextButton
                text="Sign in with a different account"
                onClick={() => {
                    const auth = getAuth();
                    auth.signOut();
                }}
            />
        </div>
    );
}

export default VerifyEmailView;