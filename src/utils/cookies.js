import Cookies from 'js-cookie'

const sessionKey = "session_id"

export function setCookie(key, value, expires) {
    return Cookies.set(key, value, { expires: expires })
}

export function getCookie(key) {
    return Cookies.get(key)
}

export function removeSession() {
    return Cookies.remove(sessionKey)
}