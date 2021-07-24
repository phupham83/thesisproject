import React from "react"
import Button from "../utils/Button"
import { useHistory } from "react-router"

const Verified = () => {
    const history = useHistory()
    const handleRedirect = (event) => {
        event.preventDefault()
        history.push("/login")
    }
    return(
        <div>
            <p>Your account has been verified please log in to continue</p>
            <Button cb ={handleRedirect} text ="Log In"/>
        </div>
    )
}

export default Verified