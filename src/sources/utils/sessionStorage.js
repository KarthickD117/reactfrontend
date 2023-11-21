export const setSessionStorage =(user, auth) => {
    sessionStorage.setItem(user, auth)
}

export const getSessionStorage = (user) => {
    return sessionStorage.getItem(user) 
}
