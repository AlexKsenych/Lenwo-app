import axios from 'axios'

const URL = 'http://localhost:2121'

const instance = axios.create({
    baseURL: URL,
    headers: {
        Authorization: window.localStorage.getItem('token'),
    },
})

export const getList = async () => {
    const res = await instance('/wordSets')
    return await res.data
}

export const postLogin = async (params) => {
    const res = await instance.post('/auth/login', params)
    return await res.data
}

export const postRegister = async (params) => {
    const res = await instance.post('/auth/register', params)
    return await res.data
}

export const getAuthMe = async () => {
    const res = await instance('/auth/me', {
        headers: {
            Authorization: window.localStorage.getItem('token'),
        },
    })
    return await res.data
}
