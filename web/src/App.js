import { initializeApp } from 'firebase/app';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { firebaseConfig } from './config/firebaseConfig';
import FullscreenLayout from './layout/FullscreenLayout';
import PrivateLayout from './layout/PrivateLayout';
import PublicLayout from './layout/PublicLayout';
import Account from './pages/app/Account';
import PaymentOverduePage from './pages/app/PaymentOverdue';
import SelectSubscriptionPage from './pages/app/SelectSubscription';
import ChangeEmailPage from './pages/app/account/ChangeEmail';
import ChangePasswordPage from './pages/app/account/ChangePassword';
import AccountRecovery from './pages/auth/AccountRecovery';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import VerifyEmailPage from './pages/auth/VerifyEmail';
import CheckoutCanceled from './pages/checkout/CheckoutCancelled';
import CheckoutCompleted from './pages/checkout/CheckoutCompleted';
import AboutUsPage from './pages/website/AboutUs';
import PrivacyPolicyPage from './pages/website/PrivacyPolicy';
import TermsOfServicePage from './pages/website/TermsOfService';
import AuthRedirect from './redirect/AuthRedirect';
import InitRedirect from './redirect/InitRedirect';
import DeleteAccountPage from './pages/app/account/DeleteAccount';
import HomePage from './pages/app/Home';
import ReactGA from 'react-ga4';
import { gaTrackingId } from './config/envConfig';
import EmailTemplatesPage from './pages/app/templates/EmailTemplates';
import LandingPage from './pages/website/landing/Landing';

if(gaTrackingId != "DISABLED") {
  ReactGA.initialize(gaTrackingId);
}

initializeApp(firebaseConfig);

function App() {
  return (
    <Routes>
      <Route element={<AuthRedirect />}>
        <Route element={<InitRedirect />}>
          <Route element={<PrivateLayout />} path="/user">
            <Route path="/user/account" element={<Account />} />
            <Route path="/user/home" element={<HomePage />} />
            <Route path="/user/account/changeEmail" element={<ChangeEmailPage />} />
            <Route path="/user/account/deleteAccount" element={<DeleteAccountPage />} />
            <Route path="/user/account/changePassword" element={<ChangePasswordPage />} />
            <Route path="/user/checkout/completed" element={<CheckoutCompleted />} />
            <Route path="/user/checkout/canceled" element={<CheckoutCanceled />} />
            <Route path="/user/subscriptionExpired" element={<SelectSubscriptionPage />} />
            <Route path="/user/emailTemplates" element={<EmailTemplatesPage />} />
          </Route>
          <Route element={<FullscreenLayout />}>
            <Route path="/user/selectSubscription" element={<SelectSubscriptionPage />} />
            <Route path="/user/paymentOverdue" element={<PaymentOverduePage />} />
          </Route>
        </Route>
        <Route element={<PublicLayout />} path="/auth">
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/auth/accountRecovery" element={<AccountRecovery />} />
          <Route path="/auth/verifyEmail" element={<VerifyEmailPage />} />
        </Route>
      </Route>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/pricing" element={<PricingPage />} /> */}
        <Route path="/aboutUs" element={<AboutUsPage />} />
        <Route path="/termsOfService" element={<TermsOfServicePage />} />
        <Route path="/privacyPolicy" element={<PrivacyPolicyPage />} />
      </Route>
    </Routes>
  );
}

export default App;