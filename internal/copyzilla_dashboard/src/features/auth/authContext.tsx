import React from 'react'

export const AuthContext = React.createContext({
    user: null,
    setUser: (user: any) => {},
});

export const AuthContextProvider = ({ children }: any) => {
    const [user, setUser] = React.useState(null);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};