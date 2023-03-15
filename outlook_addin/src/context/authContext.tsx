import React, { ReactNode, createContext, useState } from 'react'

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

    const contextValue: AuthContextValue = {
        user,
        setUser,
    };

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;