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