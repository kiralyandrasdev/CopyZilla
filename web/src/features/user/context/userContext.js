import React, { createContext, useState } from 'react';

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
    const [userCredit, setUserCredit] = useState(50);

    const decreaseUserCredit = () => {
        setUserCredit(prevCredits => prevCredits - -1);
    }

    const increaseUserCredit = (value) => {
        setUserCredit(prevCredits => prevCredits + value);
    }

    const values = {
        userCredit,
        decreaseUserCredit,
        increaseUserCredit
    };

    return (
        <UserContext.Provider value={values}>
            {children}
        </UserContext.Provider>
    );
}