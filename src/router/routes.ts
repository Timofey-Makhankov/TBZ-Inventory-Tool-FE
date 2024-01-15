export const routes = {
    home: "/",
    login: "/login",
    register: "/register"
} as const

export type Routes = (typeof routes)[keyof typeof routes];