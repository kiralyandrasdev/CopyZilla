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