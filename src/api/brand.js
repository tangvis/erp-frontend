import service from '../utils/request'

export function addBrand(data) {
    return service({
        url: '/brand/add',
        method: 'post',
        data: data
    })
}

export function deleteBrand(data) {
    return service({
        url: '/brand/delete',
        method: 'post',
        data: data
    })
}

export function listBrand(data) {
    return service({
        url: '/brand/list',
        method: 'post',
        data: data
    })
}

export function updateBrand(data) {
    return service({
        url: '/brand/update',
        method: 'post',
        data: data
    })
}