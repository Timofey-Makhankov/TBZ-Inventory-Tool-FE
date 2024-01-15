import { AxiosInstance, AxiosResponse } from "axios"
import apiDefault, { jwtTokenKey } from "./Api";
import { User } from "../types/User";
import * as jose from 'jose'

const AuthorizationService = (api: AxiosInstance = apiDefault) => ({
    logIn: async (email: string, password: string): Promise<User> => {
        const input = {
            email: email,
            password: password
        }
        const response: AxiosResponse = await api.post("/user/login", input)
        //const AuthorizationHeader = response.headers.get("Authorization")
        const auth: string = response.headers["authorization"]
        localStorage.setItem(jwtTokenKey, auth.split(" ")[1])
        return response.data
    },
})

export function validateToken(token: string): boolean {
    const claims = jose.decodeJwt(token);
    if (!claims.exp){
        return false
    }
    return !(Date.now() > claims.exp * 1000); 
}

export default AuthorizationService