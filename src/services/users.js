import axios from "axios"
const baseUrl = "/api/login"

const login = async credentials => {
    const response = await axios.post(baseUrl, credentials)
    return response.data
}

const signup = async credentials => {
    const respone = await axios.post("/api/users", credentials)
    return respone.data
}

const getConsent = async id => {
    await axios.get("/api/obpApi/connect")
    const response = await axios.put("/api/obpApi/save/" + id)
    return response.data
}

const getAccounts = async id =>{
    const response = await axios.get("/api/obpApi/getMyAccounts/" + id)
    return response.data
}

export default { login, signup, getConsent, getAccounts }