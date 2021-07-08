import React from "react"
import { useDispatch } from "react-redux"
import { login } from "../../reducers/userReducer"
import { useHistory } from "react-router"
import { setMessage } from "../../reducers/messageReducer"
import Message from "../Message"

const Login = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const handleLogin = (event) => {
        event.preventDefault()
        const username = event.target.Username.value
        const password = event.target.Password.value
        const cb = () => history.push("/")
        const messageCb = (message) => {dispatch(setMessage(message))}
        dispatch(login(username,password, cb, messageCb))
    }

    return (
        <div>
            <Message />
            <h2>Log in to application</h2>
            <form onSubmit={handleLogin}>
                <div>
      Username
                    <input
                        type="text"
                        name="Username"
                        id ="username"
                    />
                </div>
                <div>
      Password
                    <input
                        type="password"
                        name="Password"
                        id="password"
                    />
                </div>
                <button id ="login-button"type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login