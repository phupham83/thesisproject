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

export default { getConsent, getAccounts }