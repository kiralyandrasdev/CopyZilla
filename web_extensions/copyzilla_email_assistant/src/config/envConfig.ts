export async function getWebsiteUrl() {
    return new Promise((resolve) => {
        chrome.management.getSelf((info) => {
            if(info.installType === "development") {
                resolve("http://localhost:3000");
            }
    
            resolve("https://copyzilla.eu");
        });
    });
}