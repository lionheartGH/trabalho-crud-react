import axios from 'axios'

const service = axios.create({
    baseURL: 'http://localhost:3400'
})

service.interceptors.request.use(config => {
    let token
    if (localStorage.getItem("token") === null) {
        config.headers.Authorization = sessionStorage.getItem("token")
        return config
    } else {
        config.headers.Authorization = localStorage.getItem("token")
        return config
    }
})

export default service