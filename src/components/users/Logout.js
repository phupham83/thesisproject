import React from "react"
import { useDispatch } from "react-redux"
import { logout } from "../../reducers/userReducer"
import { useHistory } from "react-router"

const Logout = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const handleLogout = (event) => {
        event.preventDefault()
        const cb = () => history.push("/")
        dispatch(logout(cb))
    }
    return(
        <button onClick ={handleLogout}>Log out</button>
    )
}

export default Logout