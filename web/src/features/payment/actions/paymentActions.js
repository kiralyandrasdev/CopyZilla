import axios from "axios";

export const CHECKOUT_MODE = {
    PAYMENT: "PAYMENT",
    SUBSCRIPTION: "SUBSCRIPTION",
}

export const createCheckoutSessionAsync = async (mode, data) => {
    try {
        const response = await axios.post(`https://localhost:7107/api/checkout/${mode.toLowerCase()}`, data);
        return response.data.value.checkoutRedirectUrl;
    } catch (e) {
        return null;
    }
}

export const getGoodsList = async () => {
    try {
        const response = await axios.get("https://localhost:7107/api/product/goods");
        return response.data.value;
    } catch (e) {
        return null;
    }
}

export const getSubscriptionList = async () => {
    try {
        const response = await axios.get("https://localhost:7107/api/product/subscriptions");
        return response.data.value;
    } catch (e) {
        return null;
    }
}

export function openCustomerPortal(email) {
    window.open(`https://billing.stripe.com/p/login/test_5kA7tD9f7eTN6OYcMM?prefilled_email=${email}`, '_blank', 'noopener,noreferrer');
}