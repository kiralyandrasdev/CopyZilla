import React, { createContext, useState } from 'react';

export const AuthContext = createContext({
    user: undefined
});

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState();

    const updateUser = (value) => {
        setUser(value);
    }

    const value = {
        user,
        updateUser
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}