export default function getEmailText() {
    const messageBodyElement = document.querySelectorAll('.a3s.aiL');
    console.log(messageBodyElement);
    let text = "";
    if (!messageBodyElement || messageBodyElement.length === 0) {
        text = getMsoNormalEmailText();
    } else {
        text = messageBodyElement[0].textContent ?? "";
    }
    return text.replace(/\n/g, " ");
}

function getMsoNormalEmailText() {
    const pList = document.querySelectorAll('p[class="MsoNormal"]');
    if (!pList || pList.length === 0) {
        return "";
    }
    let text = "";
    for (let i = 0; i < pList.length; i++) {
        text += pList[i].textContent;
    }
    return text;
}