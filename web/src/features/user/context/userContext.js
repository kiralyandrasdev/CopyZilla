import React, { createContext, useState } from 'react';
import usePersistState from '../../../hooks/usePersistState';

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = usePersistState("user", {});

    const decreaseUserCredit = () => {
        setUser({
            ...values,
            creditCount: user.creditCount - 1,
        });
    }

    const increaseUserCredit = () => {
        setUser({
            ...values,
            creditCount: user.creditCount + 1,
        });
    }

    const updateUser = (value) => {
        setUser(value);
    }

    const values = {
        user,
        updateUser,
        decreaseUserCredit,
        increaseUserCredit
    };

    return (
        <UserContext.Provider value={values}>
            {children}
        </UserContext.Provider>
    );
}