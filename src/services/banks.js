import axios from "axios"
const baseUrl = "/api/banks"

const createBank = async bank => {
    const response = await axios.post(baseUrl, bank)
    return response.data
}

const getBank = async bank_id => {
    const response = await axios.get(baseUrl + "/" +bank_id)
    return response.data
}

export default { createBank, getBank }