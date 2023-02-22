import { initializeApp } from "@firebase/app";
import { getAuth, onAuthStateChanged } from "@firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyABqjrYSGB9I9yMnpDOzm2r09cPzU1Sjo4",
    authDomain: "copyzilla-f4288.firebaseapp.com",
    projectId: "copyzilla-f4288",
    storageBucket: "copyzilla-f4288.appspot.com",
    messagingSenderId: "956768885933",
    appId: "1:956768885933:web:3c02f4b05595b989feba24",
    measurementId: "G-3FQX6DLE0N"
};

initializeApp(firebaseConfig);

const auth = getAuth();

onAuthStateChanged(auth, (user) => {
    if (user && user.emailVerified) {
        chrome.storage.sync.set({ uid: user.uid, token: user.accessToken, email: user.email });
    } else {
        chrome.storage.sync.set({ uid: null, token: null, email: null });
    }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.type == "to_background_WRITE_REPLY") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.storage.sync.get(["uid", "token"], (result) => {
                if (!result.uid || !result.token) {
                    chrome.tabs.sendMessage(tabs[0].id, {
                        type: "to_content_WRITE_REPLY", data: {
                            reply: "Kérlek jelentkezz be a fiókodba a bővítmény ablakon keresztül a funkció használatához.",
                        }
                    }, (response) => {
                        sendResponse(response);
                    });

                    return;
                }

                writeReply(result.uid, result.token, request.data).then((response) => {
                    chrome.tabs.sendMessage(tabs[0].id, {
                        type: "to_content_WRITE_REPLY", data: {
                            reply: response.value,
                        }
                    }, (response) => {
                        sendResponse(response);
                    });
                }).catch((error) => {
                    chrome.tabs.sendMessage(tabs[0].id, {
                        type: "to_content_WRITE_REPLY", data: {
                            reply: error.errorMessage ?? "Unknown error",
                        }
                    }, (response) => {
                        sendResponse(response);
                    });
                });
            });
        });
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
    const url = `https://localhost:7107/api/user/${uid}`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    const user = response.json();
    return user;
}

async function writeReply(
    uid,
    token,
    options
) {
    return new Promise((resolve, reject) => {
        resolve({ value: "Example value" });
    });
}