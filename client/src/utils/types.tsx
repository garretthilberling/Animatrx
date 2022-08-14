export type parameter = {
    filter: string,
    by: string,
};

export type newUser = {
    username: string,
    email: string,
    password: string
}

export type userLogin = {
    email: string,
    password: string
}

export type userOutput = {
    token: string,
    user: {
        username: string,
        email: string,
        password: string,
    }
}

export type authService = {
    getProfile(): any 
    loggedIn(): boolean | void
    isTokenExpired(token: string): boolean
    getToken(): string | null
    login(idToken: userOutput): void
    logout(): void
}

export type youtubeVideo = {
    get(): void
}