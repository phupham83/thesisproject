import axios from "axios"
const baseUrl = "/api/obpApi"

const getConsent = () => {
    // await axios.get("/api/obpApi/connect")
    window.location.href = baseUrl + "/connect"
}

const getAccounts = async () => {
    const response = await axios.get(baseUrl + "/getMyAccounts")
    return response.data
}

const getTransactions = async (bankid, id) => {
    const response = await axios.get(baseUrl + "/getTransactions/" + bankid + "/" + id)
    return response.data
}

const getSingleAccount = async (bankid, id) => {
    const response = await axios.get(baseUrl + "/getAccount/" + bankid + "/" + id)
    return response.data
}

const getBalance = async (bankid) => {
    const response = await axios.get(baseUrl + "/getBalance/" + bankid)
    return response.data
}

const grantView = async id => {
    const response = await axios.post(baseUrl + "/grantView", id)
    return response.data
}

const revokeView = async id => {
    const response = await axios.post(baseUrl + "/revokeView", id)
    return response.data
}

export default { getConsent, getAccounts, getTransactions, getBalance, grantView, getSingleAccount, revokeView }