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
                <h3>You will be transfered to Open Banking Project where the Application will request the following information: </h3>
                <p>Your account details </p>
                <p>Your regular payments </p>
                <p>Your accounts transactions </p>
                <p>The application would only use these infomation to provide you services. </p>
                <p>Any indentifying information is removed </p>
                <Button cb = {handleConfirm} text ="Login to the Open Banking Project " />
            </div>
        </div>
    )
}

export default Consent