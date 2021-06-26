import React from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'

const Login = () =>{
    const dispatch = useDispatch()
    const handleLogin = (event) =>{
        event.preventDefault()
        const username = event.target.Username.value
        const password = event.target.Password.value
        dispatch(login(username,password))
    }
    return (
        <div>
            <h2>Log in to application</h2>
            <form onSubmit={handleLogin}>
                <div>
      username
                    <input
                        type="text"
                        name="Username"
                        id ="username"
                    />
                </div>
                <div>
      password
                    <input
                        type="password"
                        name="Password"
                        id="password"
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default Login