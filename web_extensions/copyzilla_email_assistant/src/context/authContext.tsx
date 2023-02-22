import React, { ReactNode, createContext, useEffect, useState } from 'react'

export interface FirebaseUser {
    uid: string;
    email?: string;
    token?: string;
}

interface AuthContextValue {
    user: FirebaseUser | null;
    setUser: (user: FirebaseUser | null) => void;
}

interface AuthContextProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextValue>({
    user: null,
    setUser: () => { },
});

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }: AuthContextProviderProps) => {
    const [user, setUser] = useState<FirebaseUser | null>(null);

    useEffect(() => {
        chrome.storage.sync.get(['uid', 'token', 'email'], (res) => {
            if (res.uid && res.token && res.email) {
                setUser({
                    uid: res.uid,
                    token: res.token,
                    email: res.email,
                });
            }
        });
    }, []);

    const contextValue: AuthContextValue = {
        user,
        setUser,
    };

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;