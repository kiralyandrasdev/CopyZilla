import React, { ReactNode, createContext, useState } from 'react'
import { ApplicationUser } from '../models/model_application_user';

interface UserContextValue {
    user: ApplicationUser | null;
    setUser: (user: ApplicationUser | null) => void;
    decreaseCredits: () => void;
}

interface UserContextProviderProps {
    children: ReactNode;
}

export const UserContext = createContext<UserContextValue>({
    user: null,
    setUser: () => { },
    decreaseCredits: () => { },
});

const UserContextProvider: React.FC<UserContextProviderProps> = ({ children }: UserContextProviderProps) => {
    const [user, setUser] = useState<ApplicationUser | null>(null);

    const contextValue: UserContextValue = {
        user,
        setUser,
        decreaseCredits: () => {
            if (user) {
                setUser({
                    ...user,
                    creditCount: user.creditCount - 1,
                });
            }
        }
    };

    return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

export default UserContextProvider;