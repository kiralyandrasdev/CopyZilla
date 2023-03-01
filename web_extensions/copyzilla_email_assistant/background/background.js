import { initializeApp } from "@firebase/app";
import { getAuth, onAuthStateChanged } from "@firebase/auth";

const prodFirebaseConfig = {
    apiKey: "AIzaSyABqjrYSGB9I9yMnpDOzm2r09cPzU1Sjo4",
    authDomain: "copyzilla-f4288.firebaseapp.com",
    projectId: "copyzilla-f4288",
    storageBucket: "copyzilla-f4288.appspot.com",
    messagingSenderId: "956768885933",
    appId: "1:956768885933:web:3c02f4b05595b989feba24",
    measurementId: "G-3FQX6DLE0N"
};

const devFirebaseConfig = {
    apiKey: "AIzaSyCptuYRmGsGFKqlmxUgBI8sb95uSgA-34o",
    authDomain: "copyzillatest.firebaseapp.com",
    projectId: "copyzillatest",
    storageBucket: "copyzillatest.appspot.com",
    messagingSenderId: "499584646337",
    appId: "1:499584646337:web:b6f5d0146efd3e56e52840"
};

async function getFirebaseConfig() {
    return new Promise((resolve) => {
        chrome.management.getSelf((info) => {
            if (info.installType === "development") {
                resolve(devFirebaseConfig);
            }

            resolve(prodFirebaseConfig);
        });
    });
}

async function initializeFirebase() {
    const firebaseConfig = await getFirebaseConfig();

    initializeApp(firebaseConfig);

    const auth = getAuth();
    
    onAuthStateChanged(auth, (user) => {
        if (user && user.emailVerified) {
            chrome.storage.sync.set({ uid: user.uid, token: user.accessToken, email: user.email });
        } else {
            chrome.storage.sync.set({ uid: null, token: null, email: null });
        }
    });
} 

initializeFirebase();

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.type == "to_background_WRITE_EMAIL") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.storage.sync.get(["uid", "token"], async (result) => {
                if (!result.uid || !result.token) {
                    chrome.tabs.sendMessage(tabs[0].id, {
                        type: "to_content_WRITE_EMAIL", data: {
                            reply: "Please sign in to your account through the extension popup.",
                        }
                    }, (response) => {
                        sendResponse(response);
                    });

                    return true;
                }

                if(request.composeType === "new" && !request.data.options.instructions) {
                    chrome.tabs.sendMessage(tabs[0].id, {
                        type: "to_content_WRITE_EMAIL", data: {
                            reply: "Please enter instructions for a new email."
                        }
                    }, (response) => {
                                    sendResponse(response);
                    });

                    return true;
                } 

                const replyRes = await writeReply(result.uid, result.token, request.data.options);

                chrome.tabs.sendMessage(tabs[0].id, {
                    type: "to_content_WRITE_EMAIL", data: {
                        reply: replyRes.errorMessage ?? replyRes.value,
                    }
                }, (errMessageRes) => {
                    sendResponse(errMessageRes);
                });

                return true;
            });

            return true;
        });

        return true;
    }

    if (request.type == "GET_USER") {
        fetchUser(request.data).then((user) => {
            sendResponse({ data: user })
        }).catch((error) => {
            sendResponse({ error: error })
        });
    }

    return true;
});

async function fetchUser({
    uid,
    token,
}) {
    const baseUrl = await getApiUrl();
    const url = `${baseUrl}/user/${uid}`;

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error("Failed to fetch user.");
    }
    const user = response.json();
    return user;
}

async function writeReply(
    uid,
    token,
    options
) {
    const baseUrl = await getApiUrl();
    const url = `${baseUrl}/user/${uid}/emailPrompt`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(options),
    });
    const data = await response.json();
    return data;
}

async function getApiUrl() {
    return new Promise((resolve) => {
        chrome.management.getSelf((info) => {
            if (info.installType === "development") {
                resolve("https://localhost:7107/api");
            }

            resolve("https://api.copyzilla.hu/api");
        });
    });
}