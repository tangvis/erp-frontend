import service from '../utils/request'

export function signUp(data) {
    return service({
        url: '/user/signup',
        method: 'post',
        data: data
    })
}

export function logIn(data) {
    return service({
        url: '/user/login',
        method: 'post',
        data: data
    })
}

export function logOut() {
    return service({
        url: '/user/logout',
        method: 'post',
    })
}