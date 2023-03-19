import React, { ReactNode, createContext, useState } from 'react'
import { ApplicationUser } from '../models/model_application_user';

interface UserContextValue {
    user: ApplicationUser | null;
    setUser: (user: ApplicationUser | null) => void;
    incrementConsumedCredits: () => void;
}

interface UserContextProviderProps {
    children: ReactNode;
}

export const UserContext = createContext<UserContextValue>({
    user: null,
    setUser: () => { },
    incrementConsumedCredits: () => { },
});

const UserContextProvider: React.FC<UserContextProviderProps> = ({ children }: UserContextProviderProps) => {
    const [user, setUser] = useState<ApplicationUser | null>(null);

    const contextValue: UserContextValue = {
        user,
        setUser,
        incrementConsumedCredits: () => {
            if (user) {
                setUser({
                    ...user,
                    consumedCredits: user.consumedCredits + 1,
                });
            }
        }
    };

    return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

export default UserContextProvider;