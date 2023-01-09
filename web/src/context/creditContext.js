import React, { createContext, useState } from "react";

export const CreditContext = createContext(null);

export function CreditContextProvider({ children }) {
    const [creditCount, setCreditCount] = useState(0);

    const increaseCreditCount = () => {
        setCreditCount(creditCount + 1);
    }

    const decreaseCreditCount = () => {
        setCreditCount(creditCount - 1);
    }

    const value =
    {
        creditCount,
        setCreditCount,
        increaseCreditCount,
        decreaseCreditCount,
    };

    return (
        <React.Fragment>
            <CreditContext.Provider value={value}>
                {children}
            </CreditContext.Provider>
        </React.Fragment>
    );
}