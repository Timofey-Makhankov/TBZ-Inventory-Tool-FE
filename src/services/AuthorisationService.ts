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
        const auth: string = response.headers["authorization"]
        localStorage.setItem(jwtTokenKey, auth.split(" ")[1])
        return response.data
    },
    register:async (email: string, password: string, firstname: string, lastname: string): Promise<User> => {
        const input = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password
        }
        const response: AxiosResponse = await api.post("/user/register", input)
        const auth: string = response.headers["authorization"]
        localStorage.setItem(jwtTokenKey, auth.split(" ")[1])
        return response.data
    }
})

export function validateToken(token: string): boolean {
    const claims = jose.decodeJwt(token);
    if (!claims.exp){
        console.log("returned false for jwt");
        return false
    }
    console.log("returned true for jwt")
    return !(Date.now() > claims.exp * 1000); 
}

export default AuthorizationService