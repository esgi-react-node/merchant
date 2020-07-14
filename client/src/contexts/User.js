import React, {createContext, useState, useContext, useEffect} from "react";

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState({});

    useEffect(() => {
        setUser(JSON.parse(window.localStorage.getItem("user") ?? "{}"));
    }, []);

    useEffect(() => {
        window.localStorage.setItem("user", JSON.stringify(user));
    }, [user]);

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);