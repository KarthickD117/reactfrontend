import { setSessionStorage } from './sessionStorage'
const Cookies = require('js-cookie') // global.Cookies -> to access it across all the files
export const setcookie = (token) => { 
    Cookies.set('token', token)
    setSessionStorage('isUser',true)
}

export const removecookie = () => {
    Cookies.remove('token')
}
