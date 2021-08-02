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

const revoke = async () => {
    const response = await axios.put("/api/users/revoke")
    return response.data
}

const revokeSingle = async (account) => {
    const response = await axios.put("/api/users/revokeSingle", account)
    return response.data
}

const addAccounts = async accountIds => {
    const response = await axios.put("/api/users/addAccounts", accountIds)
    return response.data
}

const changeNumber = async number => {
    const response = await axios.put("/api/users/changeNumber", number)
    return response.data
}

const setBudget = async budget => {
    const response = await axios.put("/api/users/setBudget", budget)
    return response.data
}

const checkEmailVerified = async () => {
    const response = await axios.get("/api/users/checkEmailVerified" )
    return response.data
}

const verifySMS = async code => {
    const response = await axios.get("/api/users/verifySMS/" + code)
    return response.data
}

const reSendSMS = async () => {
    const response = await axios.get("/api/users/reSendSMS")
    return response.data
}

export default { login, signup, localLogin, logOut, revoke, addAccounts,revokeSingle, checkEmailVerified, verifySMS,reSendSMS, changeNumber, setBudget }