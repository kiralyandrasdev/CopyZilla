import axios from "axios";

export const createRefillCheckoutSession = async (data) => {
    try {
        const response = await axios.post("https://localhost:7107/api/checkout", data);
        console.log("data: ", data);
        console.log("response: ", response);
        return response.data.value.checkoutRedirectUrl;
    } catch (e) {
        console.log(e);
        return null;
    }
}

export const getGoodsList = async () => {
    try {
        const response = await axios.get("https://localhost:7107/api/product/goods");
        return response.data.value;
    } catch (e) {
        console.log(e);
        return null;
    }
}

export const getSubscriptionList = async () => {
    try {
        const response = await axios.get("https://localhost:7107/api/product/subscriptions");
        return response.data.value;
    } catch (e) {
        console.log(e);
        return null;
    }
}