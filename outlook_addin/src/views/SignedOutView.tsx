import React from 'react'
import LoginForm from '../features/authentication/LoginForm';
import { websiteUrl } from '../config/envConfig';
import TextButton from '../components/TextButton';
import styles from './SignedOutView.module.css';
import AuthSvg from '../assets/auth.svg';

function SignedOutView() {

    const handleNewAccountClick = async () => {
        const url = `${websiteUrl}/auth/signup`;
        window.open(url, "_blank");
    }

    return (
        <div className={styles.view}>
            <h6>copyzilla</h6>
            <div className={styles.form}>
                <img src={AuthSvg} alt="" className='illustration' />
                <h5>Sign in to your account</h5>
                <LoginForm />
                <div className={`${styles.form__signUp} description`}>
                    <p>Don't have an account?</p>
                    <a href="https://copyzilla.hu/auth/signup">Create an account</a>
                </div>
            </div>
            <p className="description">Need help? <a href="https://copyzilla.hu/auth/signup">Contact Us</a></p>
        </div>
    );
}

export default SignedOutView;