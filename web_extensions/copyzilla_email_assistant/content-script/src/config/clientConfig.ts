import { MailClient } from "../enum/mailClient";

export type ClientConfig = {
    appEntryClass: string;
    messageEntryClass: string;
    previousEmailEntryClass: string;
};

export const ClientConfigList: Map<MailClient, ClientConfig> = new Map([
    [
        MailClient.Gmail,
        {
            appEntryClass: ".GQ",
            messageEntryClass: ".Am.Al.editable.LW-avf.tS-tW",
            previousEmailEntryClass: ".a3s.aiL",
        },
    ],
    [
        MailClient.Outlook,
        {
            appEntryClass: ".yz4r1",
            messageEntryClass: ".dFCbN.k1Ttj.dPKNh.DziEn",
            previousEmailEntryClass: ".XbIp4.jmmB7.GNqVo.yxtKT.allowTextSelection",
        },
    ]    
]);