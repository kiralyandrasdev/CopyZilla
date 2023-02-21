chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.type == "WRITE_REPLY") {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {type: "WRITE_REPLY", data: request.data}, (response) => {
                console.log("Response from content script to background script.");
                sendResponse(response);
            });
        });
    }

    return true;
});