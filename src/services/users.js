import axios from "axios"
const baseUrl = "/api/users"

const signup = async credentials => {
    const respone = await axios.post(baseUrl, credentials)
    return respone.data
}

export default {signup}