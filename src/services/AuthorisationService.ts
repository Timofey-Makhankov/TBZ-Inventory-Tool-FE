import { AxiosInstance, AxiosResponse } from "axios"
import apiDefault, { jwtTokenKey } from "./Api";

const AuthorizationService = (api: AxiosInstance = apiDefault) => ({
    logIn:async (email: string, password: string) => {
        const input = {
            email: email,
            password: password
        }
        const response: AxiosResponse = await api.post("/user/login", input)
        localStorage.setItem(jwtTokenKey, response.headers.getAuthorization!.toString())
        return response.data
    }
})