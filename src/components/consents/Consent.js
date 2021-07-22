import React from "react"
import { useDispatch } from "react-redux"
import { getConsent } from "../../reducers/userReducer"
import Button from "../utils/Button"

const Consent = () => {
    const dispatch = useDispatch()

    const handleConfirm =(event) => {
        event.preventDefault()
        dispatch(getConsent())
    }
    return(
        <div>
            <div>
                <h1>Consent confirmation</h1>
                <p>By accepting you are allowing your data to be accessed</p>
                <Button cb = {handleConfirm} text ="Confirm" />
            </div>
        </div>
    )
}

export default Consent