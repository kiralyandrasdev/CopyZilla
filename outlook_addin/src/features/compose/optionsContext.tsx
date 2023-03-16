import React, { ReactNode, createContext, useEffect, useState } from 'react'
import { ReplyTypeItem } from './components/response_type/ReplyType';
import { ReplyToneModel } from './components/mood/ReplyTone';
import { ComposeType } from '../../enum/composeType';
import { AvailableTones, AvailableTypes } from './config/replyConfig';

export interface GenerateEmailOptions {
    to?: string;
    subject?: string; 
    email: string;
    objective: ReplyTypeItem;
    tone: ReplyToneModel;
    instructions?: string;
}

export interface GenerateEmailResponse {
    value: string;
}

interface OptionsContextValue {
    composeType: ComposeType;
    setComposeType: (composeType: ComposeType) => void;
    options: GenerateEmailOptions;
    to?: string;
    setTo(to?: string): void;
    subject?: string;
    setSubject(subject?: string): void;
    setEmail: (email: string) => void;
    setObjective: (objective: ReplyToneModel) => void;
    setTone: (tone: ReplyToneModel) => void;
    setInstructions: (instructions: string) => void;
}

interface OptionsContextValueProviderProps {
    children: ReactNode;
}

export const OptionsContext = createContext<OptionsContextValue>({
    composeType: ComposeType.Reply,
    setComposeType: () => {},
    options: {
        email: '',
        objective: AvailableTypes[0],
        tone: AvailableTones[0],
        instructions: '',
    },
    to: '',
    setTo: () => {},
    subject: '',
    setSubject: () => {},
    setEmail: () => {},
    setObjective: () => {},
    setTone: () => {},
    setInstructions: () => {},
});

const OptionsContextProvider: React.FC<OptionsContextValueProviderProps> = ({ children }: OptionsContextValueProviderProps) => {
    const [composeType, setComposeType] = useState<ComposeType>(ComposeType.Reply);

    const [to, setTo] = useState<string>();
    const [subject, setSubject] = useState<string>();
    const [email, setEmail] = useState('');
    const [objective, setObjective] = useState(AvailableTypes[0]);
    const [tone, setTone] = useState(AvailableTones[0]);
    const [instructions, setInstructions] = useState<string>('');

    const contextValue: OptionsContextValue = {
        composeType: composeType,
        setComposeType: (composeType: ComposeType) => {
            setComposeType(composeType);
        },
        options: {
            email,
            objective,
            tone,
            instructions,
        },
        to,
        setTo: (to?: string) => {
            setTo(to);
        },
        subject,
        setSubject: (subject?: string) => {
            setSubject(subject);
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