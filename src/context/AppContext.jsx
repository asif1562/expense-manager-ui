
import React, { createContext, useState } from "react";

export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const clearUser = () => {
        setUser(null);
    }

    const contextValue = {
        user,
        setUser,
        clearUser
    };

    console.log("Provider context:", contextValue);

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};