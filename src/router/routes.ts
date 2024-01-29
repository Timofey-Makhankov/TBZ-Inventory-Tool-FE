export const routes = {
    home: "/",
    login: "/login",
    register: "/register",
    createItem: "/item/create"
} as const

export type Routes = (typeof routes)[keyof typeof routes];