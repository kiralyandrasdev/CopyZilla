import React, { createContext, useState } from "react";

export const UserContext = createContext({
    creditCount: 0,
});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState({});

    const updateUser = (value) => {
        setUser(value);
    }

    const increaseCreditCount = () => {
        setUser({ ...user, creditCount: user.creditCount + 1 });
    }

    const decreaseCreditCount = () => {
        setUser({ ...user, creditCount: user.creditCount - 1 });
    }

    const value = {
        user,
        updateUser,
        increaseCreditCount,
        decreaseCreditCount,
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}