import axios, { AxiosInstance } from 'axios'

// const backend = 'http://localhost:3000/api'
const backend = 'http://user.sachinms.fyi/api'

function createAxiosInstance(baseURL: string, withCredentials: boolean = false): AxiosInstance {
     return axios.create({
          baseURL,
          withCredentials,
     })
}

const users: AxiosInstance = createAxiosInstance(backend, true)

export default users
