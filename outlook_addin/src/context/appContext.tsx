import React, { ReactNode, createContext, useState } from 'react'

export enum AppState {
    Splash = 'Splash',
    EmailNotVerified = 'EmailNotVerified',
    SignedIn = 'SignedIn',
    SignedOut = 'SignedOut',
    PaymentOverdue = 'PaymentOverdue',
}

interface AppContextValue {
    appState: AppState;
    setAppState: (state: AppState) => void;
    composedEmail: string;
    setComposedEmail: (composedEmail: string) => void;
    snackBarMessage: string | null;
    clearSnackBarMessage: () => void;
    message: string | null;
    setMessage: (message: string | null) => void;
    error: string | null;
    setError: (error: string | null) => void;
}

interface AppContextProviderProps {
    children: ReactNode;
}

export const AppContext = createContext<AppContextValue>({
    appState: AppState.Splash,
    setAppState: (state: AppState) => { },
    composedEmail: '',
    setComposedEmail: () => { },
    snackBarMessage: null,
    clearSnackBarMessage: () => { },
    message: null,
    setMessage: () => { },
    error: null,
    setError: () => { },
});

const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }: AppContextProviderProps) => {
    const [appState, setAppState] = useState<AppState>(AppState.Splash);

    const [composedEmail, innerSetComposeEmail] = useState<string>('');
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const setComposedEmail = (composedEmail: string) => {
        // TODO: Typewriter effect
        innerSetComposeEmail(composedEmail);
    };

    const contextValue: AppContextValue = {
        appState,
        setAppState,
        composedEmail,
        setComposedEmail,
        snackBarMessage: error || message,
        clearSnackBarMessage: () => {
            setMessage(null);
            setError(null);
        },
        message,
        setMessage,
        error,
        setError,
    };

    return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export default AppContextProvider;