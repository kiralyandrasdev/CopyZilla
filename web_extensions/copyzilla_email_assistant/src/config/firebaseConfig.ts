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

export async function getFirebaseConfig() {
    return new Promise((resolve) => {
        chrome.management.getSelf((info) => {
            if (info.installType === "development") {
                resolve(devFirebaseConfig);
            }

            resolve(prodFirebaseConfig);
        });
    });
}