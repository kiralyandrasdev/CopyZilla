import { initializeApp } from "@firebase/app";
import { getAuth, onAuthStateChanged } from "@firebase/auth";

const prodFirebaseConfig = {
    apiKey: "",
    authDomain: "copyzilla-f4288.firebaseapp.com",
    projectId: "copyzilla-f4288",
    storageBucket: "copyzilla-f4288.appspot.com",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};

const devFirebaseConfig = {
    apiKey: "",
    authDomain: "copyzillatest.firebaseapp.com",
    projectId: "copyzillatest",
    storageBucket: "copyzillatest.appspot.com",
    messagingSenderId: "",
    appId: ""
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

    onAuthStateChanged(auth, async (user) => {
        if (user && user.emailVerified) {
            console.log("User is signed in");

            chrome.storage.sync.set({
                uid: user.uid,
                token: user.accessToken,
                email: user.email,
                lastTokenRefresh: Date.now() / 1000,
                // lastTokenRefresh: new Date(Date.now() - 86400000).getTime() / 1000,
            });

            const response = await fetchUser();

            chrome.storage.sync.set({
                userId: response.value.id,
            })
        } else {
            chrome.storage.sync.set({
                uid: null,
                token: null,
                email: null,
                userId: null
            });
        }
    });
}

initializeFirebase();

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.type == "to_background_WRITE_EMAIL") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.storage.sync.get(["uid", "token", "email"], async (result) => {
                if (!result.uid || !result.token) {
                    chrome.tabs.sendMessage(tabs[0].id, {
                        type: "to_content_WRITE_EMAIL", data: {
                            reply: "Please sign in to your account through the extension popup",
                        }
                    }, (response) => {
                        sendResponse(response);
                    });

                    return true;
                }

                if (request.composeType === "new" && !request.data.options.instructions) {
                    chrome.tabs.sendMessage(tabs[0].id, {
                        type: "to_content_WRITE_EMAIL", data: {
                            reply: "Please enter instructions for a new email"
                        }
                    }, (response) => {
                        sendResponse(response);
                    });

                    return true;
                }

                console.log("Writing email...");

                // Returns cached token if it is valid for at least another 5 minutes or refreshes it.
                getValidToken().then((token) => {
                    console.log("Successfully acquired token");

                    writeReply(result.uid, result.email, token, request.data.options).then((response) => {
                        console.log("Successfully wrote email");

                        chrome.tabs.sendMessage(tabs[0].id, {
                            type: "to_content_WRITE_EMAIL", data: {
                                reply: response.errorMessage ?? response.value,
                            }
                        }, (response) => {
                            sendResponse(response);
                        });
                    });
                }).catch((error) => {
                    console.log("Error acquiring token: " + error);
                    chrome.tabs.sendMessage(tabs[0].id, {
                        type: "to_content_WRITE_EMAIL", data: {
                            reply: error.errorMessage ?? "An unexpected error occured",
                        }
                    }, (response) => {
                        sendResponse(response);
                    });
                });

                return true;
            });

            return true;
        });

        return true;
    }

    if (request.type == "GET_USER") {
        fetchUser().then((response) => {
            sendResponse({ data: response })
        }).catch((error) => {
            sendResponse({ error: error });
        });
    }

    if (request.type == "to_background_GET_TEMPLATES") {
        isSignedIn().then((signedIn) => {
            if (!signedIn) {
                sendResponse({ data: [], error: "Please sign in to your account through the extension popup" })
                return true;
            }

            fetchTemplates().then((response) => {
                sendResponse({ data: response.value })
            }).catch((error) => {
                sendResponse({ error: error.errorMessage ?? "An unexpected error occured" });
            });
        });
    }

    if (request.type == "to_background_SELECT_TEMPLATE") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {
                type: "to_content_WRITE_EMAIL", data: {
                    reply: request.data,
                }
            }, (response) => {
                sendResponse(response);
            });
        });
    }

    if (request.type == "to_background_REPHRASE") {
        isSignedIn().then((signedIn) => {
            if (!signedIn) {
                chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                    chrome.tabs.sendMessage(tabs[0].id, {
                        type: "to_content_WRITE_EMAIL", data: {
                            reply: "Please sign in to your account through the extension popup",
                        }
                    }, (response) => {
                        sendResponse(response);
                    });
                });

                return true;
            }

            rephrase({
                selection: request.data.selection,
                objective: request.data.objective,
            }).then((rephraseResponse) => {
                const updatedEmail = request.data.currentContent.replace(request.data.selection, rephraseResponse.value);

                chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                    chrome.tabs.sendMessage(tabs[0].id, {
                        type: "to_content_WRITE_EMAIL", data: {
                            reply: updatedEmail,
                        }
                    }, (response) => {
                        sendResponse(response);
                    });
                });
            }).catch((error) => {
                console.log("Error rephrasing text: " + error);

                chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                    chrome.tabs.sendMessage(tabs[0].id, {
                        type: "to_content_WRITE_EMAIL", data: {
                            reply: "Error rephrasing text, please try again or contact support",
                        }
                    }, (response) => {
                        sendResponse(response);
                    });
                });
            });
        });
    }

    return true;
});

async function getValidToken() {
    return new Promise((resolve) => {
        chrome.storage.sync.get(["token", "lastTokenRefresh"], async (result) => {
            const currentTime = Date.now() / 1000;

            // Check if token is invalid or will expire in less than 5 minutes.
            if (!result.lastTokenRefresh || result.lastTokenRefresh + 3300 < currentTime) {
                console.log("Refreshing token...");

                const auth = getAuth();
                const user = auth.currentUser;

                try {
                    const token = await user.getIdToken(true);
                    chrome.storage.sync.set({
                        token: token,
                        lastTokenRefresh: Date.now() / 1000,
                    });

                    console.log("Access token refreshed.");

                    resolve(token);
                } catch (error) {
                    console.log("Error refreshing token: " + error);
                }

                return;
            }

            console.log("Using cached token...");

            // Token is valid for at least another 5 minutes.
            resolve(result.token);
        });
    })
}

async function fetchUser() {
    console.log("Fetching user...");

    await new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 1500);
    });

    return new Promise((resolve, reject) => {
        chrome.storage.sync.get(["uid", "email"], async (result) => {
            console.log("Fetching user, uid: " + result.uid + ", email: " + result.email);

            const token = await getValidToken();

            const baseUrl = await getApiUrl();
            const url = `${baseUrl}/user/${result.uid}`;

            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                    "X-User-Email": result.email,
                    "X-Client-Type": "extension"
                },
            });

            console.log("Fetched user: " + response.ok);

            if (!response.ok) {
                console.log("Error fetching user: " + response.status);

                reject(response);
            }

            const json = response.json();
            resolve(json);
        });
    });
}

async function writeReply(
    uid,
    email,
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
            "X-User-Email": email,
            "X-Client-Type": "extension"
        },
        body: JSON.stringify(options),
    });
    const data = await response.json();
    return data;
}

async function fetchTemplates() {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get(["userId", "email"], async (result) => {
            const token = await getValidToken();

            const baseUrl = await getApiUrl();
            const url = `${baseUrl}/user/${result.userId}/templates`;

            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                    "X-User-Email": result.email,
                    "X-Client-Type": "extension"
                },
            });
            if (!response.ok) {
                reject(response);
            }
            const json = response.json();
            resolve(json);
        });
    });
}

async function rephrase({
    selection,
    objective
}) {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get(["userId", "email"], async (result) => {
            const token = await getValidToken();

            const baseUrl = await getApiUrl();
            const url = `${baseUrl}/user/${result.userId}/rephrasePrompt`;

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                    "X-User-Email": result.email,
                    "X-Client-Type": "extension"
                },
                body: JSON.stringify({
                    text: selection,
                    objective,
                }),
            });
            if (!response.ok) {
                reject(response);
            }
            const json = response.json();
            resolve(json);
        });
    });
}

async function getApiUrl() {
    return new Promise((resolve) => {
        chrome.management.getSelf((info) => {
            if (info.installType === "development") {
                resolve("https://localhost:7107/api");
            }

            resolve("https://api.copyzilla.eu/api");
        });
    });
}

async function isSignedIn() {
    return new Promise((resolve) => {
        chrome.storage.sync.get(["token"], (result) => {
            if (result.token) {
                resolve(true);
            }

            resolve(false);
        });
    });
}