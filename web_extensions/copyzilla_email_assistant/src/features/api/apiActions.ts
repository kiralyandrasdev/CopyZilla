import { ApplicationUser } from "../models/model_application_user";

export interface GetUserOptions {
    token: string;
    uid: string;
}

export const getUser = async (options: GetUserOptions): Promise<ApplicationUser | null> => {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({ type: "GET_USER", data: {
            token: options.token,
            uid: options.uid
        } }, (response) => {
            if(response.error) {
                reject(response.error);
            } else {
                resolve(response.data.value);
            }
        });
    });
}