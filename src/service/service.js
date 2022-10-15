import axios from 'axios'

const URL = 'http://localhost:2121'

const instance = axios.create({
    baseURL: URL,
    headers: {
        Authorization: window.localStorage.getItem('token'),
    },
})

export const postLogin = async (params) => {
    const res = await instance.post('/auth/login', params)
    return await res.data
}

export const postRegister = async (params) => {
    const res = await instance.post('/auth/register', params)
    return await res.data
}

export const getMe = async () => {
    const res = await instance('/auth/me', {
        headers: {
            Authorization: window.localStorage.getItem('token'),
        },
    })
    return await res.data.userData
}

export const postWordSet = async (wordSet) => {
    const res = await instance.post('/word-set', wordSet)
    return await res.data
}
