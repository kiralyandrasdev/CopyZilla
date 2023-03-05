import { ApplicationUser } from "../models/model_application_user";

export const getUser = async (): Promise<ApplicationUser | null> => {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({ type: "GET_USER" }, (response) => {
            console.log("response", response);
            if(response.error) {
                reject(response.error);
            } else {
                resolve(response.data.value);
            }
        });
    });
}