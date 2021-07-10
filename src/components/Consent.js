import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { getConsent } from "../reducers/userReducer"
import { Redirect } from "react-router"
import Button from "./utils/Button"

const Consent = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const handleConfirm =(event) => {
        event.preventDefault()
        dispatch(getConsent())
    }
    return(
        <div>
            {user ? <div>
                <h1 className="text-3xl font-semibold text-gray-800 md:text-4xl">Consent confirmation</h1>
                <p>By accepting you are allowing your data to be accessed</p>
                <Button cb = {handleConfirm} text ="Confirm" />
            </div> :
                <Redirect to ="/"/>
            }
        </div>
    )
}

export default Consent