import React, { ReactNode, createContext, useEffect, useState } from 'react'
import { AvailableTones, AvailableTypes } from '../features/reply/config/replyConfig';
import { ReplyToneModel } from '../features/reply/components/mood/ReplyTone';
import { ReplyTypeItem } from '../features/reply/components/response_type/ReplyType';
import { MailClient as MailClient, PopupMode } from '../App';

export interface GenerateEmailOptions {
    email: string;
    objective: ReplyTypeItem;
    tone: ReplyToneModel;
    instructions?: string;
}

export interface GenerateEmailResponse {
    value: string;
}

interface OptionsContextValue {
    popupMode: PopupMode;
    setPopupMode: (popupMode: PopupMode) => void;
    mailClient: MailClient;
    setMailClient: (mailClient: MailClient) => void;
    options: GenerateEmailOptions;
    setEmail: (email: string) => void;
    setObjective: (objective: ReplyToneModel) => void;
    setTone: (tone: ReplyToneModel) => void;
    setInstructions: (instructions: string) => void;
}

interface OptionsContextValueProviderProps {
    children: ReactNode;
}

export const OptionsContext = createContext<OptionsContextValue>({
    popupMode: PopupMode.Allow,
    setPopupMode: () => {},
    mailClient: MailClient.Gmail,
    setMailClient: () => {},
    options: {
        email: '',
        objective: AvailableTypes[0],
        tone: AvailableTones[0],
        instructions: '',
    },
    setEmail: () => {},
    setObjective: () => {},
    setTone: () => {},
    setInstructions: () => {},
});

const OptionsContextProvider: React.FC<OptionsContextValueProviderProps> = ({ children }: OptionsContextValueProviderProps) => {
    const [popupMode, setPopupMode] = useState<PopupMode>(PopupMode.Allow);
    const [mailClient, setMailClient] = useState<MailClient>(MailClient.Gmail);

    const [email, setEmail] = useState('');
    const [objective, setObjective] = useState(AvailableTypes[0]);
    const [tone, setTone] = useState(AvailableTones[0]);
    const [instructions, setInstructions] = useState<string>('');

    const contextValue: OptionsContextValue = {
        popupMode: popupMode,
        setPopupMode: (popupMode: PopupMode) => {
            setPopupMode(popupMode);
        },
        mailClient: mailClient,
        setMailClient: (mailClient: MailClient) => {
            setMailClient(mailClient);
        },
        options: {
            email,
            objective,
            tone,
            instructions,
        },
        setEmail: (email: string) => {
            setEmail(email);
        },
        setObjective: (objective: ReplyTypeItem) => {
            setObjective(objective);
        },
        setTone: (tone: ReplyToneModel) => {
            setTone(tone);
        },
        setInstructions: (instructions: string) => {
            setInstructions(instructions);
        }
    };

    return <OptionsContext.Provider value={contextValue}>{children}</OptionsContext.Provider>;
};

export default OptionsContextProvider;