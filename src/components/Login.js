import React from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/userReducer'
import { useHistory } from 'react-router'

const Login = () =>{
    const dispatch = useDispatch()
    const history = useHistory()
    const handleLogin = (event) =>{
        event.preventDefault()
        const username = event.target.Username.value
        const password = event.target.Password.value
        const cb = () => history.push("/")
        dispatch(login(username,password, cb))
    }
    return (
        <div>
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
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login