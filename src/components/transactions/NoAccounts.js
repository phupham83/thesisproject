import React from "react"
import { useHistory } from "react-router"
import Button from "../utils/Button"

const NoAccounts = () => {
    const history = useHistory()
    const handleAccountAuth = (event) => {
        event.preventDefault()
        history.push("/consent")
    }
    return(
        <div className ="addAccount">
            <p>Please add an account to start</p>
            <Button cb ={handleAccountAuth} text ="Add Account"/>
        </div>
    )
}

export default NoAccounts