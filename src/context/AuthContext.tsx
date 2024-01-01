import React, { createContext } from "react"

type Auth = {
    token: string | null; 
    authenticated: boolean;
}

type AuthContext = { 
    auth: Auth;
    setAuth: React.Dispatch<React.SetStateAction<Auth>>;
};

const AuthContext = createContext<AuthContext>({
    auth: {
        token: "",
        authenticated: false
    },
    setAuth: () => {}
});

export { Auth, AuthContext };