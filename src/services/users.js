import axios from "axios"
const baseUrl = "/api/login"

const login = async credentials => {
    const response = await axios.post(baseUrl, credentials)
    return response.data
}

const localLogin = async () => {
    const response = await axios.get(baseUrl + "/local_login")
    return response.data
}

const logOut = async () => {
    const response = await axios.get(baseUrl + "/logout")
    return response.data
}

const signup = async credentials => {
    const respone = await axios.post("/api/users", credentials)
    return respone.data
}


export default { login, signup, localLogin, logOut }