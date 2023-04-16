import axios from 'axios'

const api = axios.create({
    baseURL: "http://139.162.15.125:9000/api/v1"
})

export default api