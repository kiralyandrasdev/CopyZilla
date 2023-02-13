import axios from "axios";
import { apiBaseUrl, stripeCustomerPortalUrl } from "../../../config/envConfig";

export const CHECKOUT_MODE = {
    PAYMENT: "PAYMENT",
    SUBSCRIPTION: "SUBSCRIPTION",
}

export const createCheckoutSessionAsync = async (mode, data, accessToken) => {
    try {
        const response = await axios.post(`${apiBaseUrl}/checkout/${mode.toLowerCase()}`, data,
            {
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                }
            });
        return response.data.value.checkoutRedirectUrl;
    } catch (e) {
        return null;
    }
}

export const getGoodsList = async ({ accessToken }) => {
    try {
        const response = await axios.get(`${apiBaseUrl}/product/goods`,
            {
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                }
            });
        return response.data.value;
    } catch (e) {
        return null;
    }
}

export const getSubscriptionList = async ({ accessToken }) => {
    try {
        const response = await axios.get(`${apiBaseUrl}/product/subscriptions`,
            {
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                }
            });
        return response.data.value;
    } catch (e) {
        return null;
    }
}

export function openCustomerPortal(email) {
    window.open(`${stripeCustomerPortalUrl}?prefilled_email=${email}`, '_blank', 'noopener,noreferrer');
}