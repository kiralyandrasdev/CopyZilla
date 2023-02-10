import axios from "axios";
import { apiBaseUrl, stripeCustomerPortalUrl } from "../../../config/envConfig";

export const CHECKOUT_MODE = {
    PAYMENT: "PAYMENT",
    SUBSCRIPTION: "SUBSCRIPTION",
}

export const createCheckoutSessionAsync = async (mode, data) => {
    try {
        const response = await axios.post(`${apiBaseUrl}/checkout/${mode.toLowerCase()}`, data);
        return response.data.value.checkoutRedirectUrl;
    } catch (e) {
        return null;
    }
}

export const getGoodsList = async () => {
    try {
        const response = await axios.get(`${apiBaseUrl}/product/goods`);
        return response.data.value;
    } catch (e) {
        return null;
    }
}

export const getSubscriptionList = async () => {
    try {
        const response = await axios.get(`${apiBaseUrl}/product/subscriptions`);
        return response.data.value;
    } catch (e) {
        return null;
    }
}

export function openCustomerPortal(email) {
    window.open(`${stripeCustomerPortalUrl}?prefilled_email=${email}`, '_blank', 'noopener,noreferrer');
}