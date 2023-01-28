import { initializeApp } from 'firebase/app';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { firebaseConfig } from './config/firebaseConfig';
import FullscreenLayout from './layout/FullscreenLayout';
import PrivateLayout from './layout/PrivateLayout';
import PublicLayout from './layout/PublicLayout';
import Account from './pages/app/Account';
import CreatePage from './pages/app/Create';
import CreditRefill from './pages/app/CreditRefill';
import SavedResultsPage from './pages/app/SavedResults';
import SelectSubscriptionPage from './pages/app/SelectSubscription';
import AccountRecovery from './pages/auth/AccountRecovery';
import AuthRedirect from './pages/auth/AuthRedirect';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import VerifyEmailPage from './pages/auth/VerifyEmail';
import CheckoutCanceled from './pages/checkout/CheckoutCancelled';
import CheckoutCompleted from './pages/checkout/CheckoutCompleted';
import AboutUsPage from './pages/website/AboutUs';
import ContactPage from './pages/website/Contact';
import LandingPage from './pages/website/Landing';
import PricingPage from './pages/website/Pricing';
import PrivacyPolicyPage from './pages/website/PrivacyPolicy';
import TermsOfServicePage from './pages/website/TermsOfService';
import PrivateRoutes from './utils/PrivateRoutes';

function App() {
  initializeApp(firebaseConfig);
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route element={<PrivateLayout />} path="/user">
          <Route path="/user/editor" element={<CreatePage />} />
          <Route path="/user/savedResults" element={<SavedResultsPage />} />
          <Route path="/user/account" element={<Account />} />
          <Route path="/user/creditRefill" element={<CreditRefill />} />
          <Route path="/user/checkout/completed" element={<CheckoutCompleted />} />
          <Route path="/user/checkout/canceled" element={<CheckoutCanceled />} />
        </Route>
        <Route element={<FullscreenLayout />}>
          <Route path="/selectSubscription" element={<SelectSubscriptionPage />} />
        </Route>
      </Route>
      <Route element={<AuthRedirect />}>
        <Route element={<PublicLayout />} path="/auth">
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/auth/accountRecovery" element={<AccountRecovery />} />
          <Route path="/auth/verifyEmail" element={<VerifyEmailPage />} />
        </Route>
      </Route>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/aboutUs" element={<AboutUsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/termsOfService" element={<TermsOfServicePage />} />
        <Route path="/privacyPolicy" element={<PrivacyPolicyPage />} />
      </Route>
    </Routes>
  );
}

export default App;