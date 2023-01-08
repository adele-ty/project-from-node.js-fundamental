export interface User {
    id: string,
    email: string,
    password: string,
    age: number,
    isDeleted: boolean,
    login: string
}

export interface LoginInfo {
    email: string,
    password: string
}