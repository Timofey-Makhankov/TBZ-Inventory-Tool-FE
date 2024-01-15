export type User = {
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    roles: Role[]
}

type Role = {
    id: string,
    name: string,
    authorities: Authority[]
}

type Authority = {
    id: string,
    name: string
}