import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";
import { User } from "../types/User";

export type AuthContextType = {
    user: User | null,
    authenticated: boolean,
    setUser: Dispatch<SetStateAction<User | null>>,
    setAuth: Dispatch<SetStateAction<boolean>>
}

export const AuthContext = createContext<AuthContextType>({user: null, authenticated: false, setAuth: () => {}, setUser: () => {}});

export const USER_KEY = "user";

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [auth, setAuth] = useState<boolean>(false)

    return (
        <AuthContext.Provider value={{ user: user, authenticated: auth, setUser: setUser, setAuth: setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider