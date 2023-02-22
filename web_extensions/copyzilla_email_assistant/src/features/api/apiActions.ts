import { ApplicationUser } from "../models/model_application_user";
import { GenerateEmailModel } from "../models/model_generate_email";
import { GenerateEmailResponseModel } from "../models/model_generate_email_response";
import axios from "axios";

export interface GenerateEmailResponseOptions {
    token: string;
    uid: string;
    data: GenerateEmailModel;
}

export const generateEmailResponse = async (options: GenerateEmailResponseOptions): Promise<GenerateEmailResponseModel> => {
    const url = `https://localhost:7107/api/user/${options.uid}/generateEmail`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${options.token}`,
        },
        body: JSON.stringify(options.data),
    });
    const body = await response.json();
    const result: GenerateEmailResponseModel = JSON.parse(body);
    return result;
};

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