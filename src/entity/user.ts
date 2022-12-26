export interface User {
    id: string,
    email: string,
    password: string,
    age: number,
    isDeleted: boolean,
    token: string
}

export interface LoginInfo {
    email: string,
    password: string
}