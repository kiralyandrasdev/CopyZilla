import React, { useContext } from "react";
import { FiKey, FiMail } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { LoadingIndicator, TextButton } from "../../components";
import { useGetUserQuery } from "../../features/api/apiSlice";
import { AuthContext } from "../../features/authentication/authContext";
import { openCustomerPortal } from "../../features/payment/actions/paymentActions";
import './Account.css';
import './AppPage.css';

function getDate(date) {
    const d = new Date(date);
    return d.toLocaleDateString();
}

export default function Profile() {
    const { firebaseUid } = useContext(AuthContext);

    const navigate = useNavigate();

    const {
        data: user,
        error,
        isFetching,
    } = useGetUserQuery({ firebaseUid });

    const productName = () => {
        let name = user.product.name;

        if (user.subscriptionStatus === "trialing") {
            name += " (Trial)"
        }

        return name;
    }

    const content = () => {
        if (isFetching) {
            return <LoadingIndicator color="white"></LoadingIndicator>;
        }

        if (error) {
            return <p>Unknown error</p>;
        }

        return (
            <>
                <div className="page__account__section page__account__section__1 animation__fadeInUp">
                    <h5>Account</h5>
                    <p className="description email__heading">{user.email}</p>
                    <div className="spacer"></div>
                    <div className="account__buttons">
                        <TextButton
                            color="white"
                            prefixIcon={<FiMail />}
                            title="Update email address"
                            onClick={() => navigate("/user/account/changeEmail")}
                        />
                        <TextButton
                            color="white"
                            prefixIcon={<FiKey />}
                            title="Update password"
                            onClick={() => navigate("/user/account/changePassword")}
                        />
                    </div>
                </div>
                <div className="page__account__section page__account__section__2 animation__fadeInUp">
                    <h5>Subscription</h5>
                    <div className="spacer"></div>
                    <p>{productName()}</p>
                    <p className="description">Renews on: {getDate(user.subscriptionValidUntil)}</p>
                    {
                        user.product.scope === "individual" ?
                            <TextButton
                                color="var(--green)"
                                underline={true}
                                title="Manage subscription and payment details"
                                onClick={() => openCustomerPortal(user.email)}
                            /> : <p>
                                Your subscription is managed by your IT administrator
                            </p>
                    }
                </div>
                <div className="page__account__section__3 animation__fadeInUp">
                    <TextButton
                        color="var(--grey2)"
                        underline={true}
                        title="Delete account"
                        onClick={() => navigate("/user/account/deleteAccount")}
                    />
                </div>
            </>
        );
    }

    return (
        <div className="page page__account page__centerContent">
            {content()}
        </div >
    );
}