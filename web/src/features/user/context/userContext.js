import React, { createContext, useState } from "react";

export const UserContext = createContext({
});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState({});

    const updateUser = (value) => {
        setUser(value);
    }

    const value = {
        user,
        updateUser,
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}