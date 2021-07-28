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
            <h3>Please add an account to start</h3>
            <Button cb ={handleAccountAuth} text ="Add Account"/>
        </div>
    )
}

export default NoAccounts