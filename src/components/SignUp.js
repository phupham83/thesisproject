import React from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router"
import { signup } from "../reducers/userReducer"

const SignUp = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const handleSignup = (event) => {
        event.preventDefault()
        const username = event.target.Username.value
        const password = event.target.Password.value
        const name = event.target.Name.value
        const cb = () => history.push("/")
        dispatch(signup(username, name, password, cb))
    }
    return (
        <div>
            <h2>Sign up for the application</h2>
            <form onSubmit ={handleSignup}>
                <div>
                    Username<input type="text" name="Username" id ="username"/>
                </div>
                <div>
                    Name<input type="text" name="Name" id ="name"/>
                </div>
                <div>
                    Password<input type="password" name="Password" id ="password"/>
                </div>
                <button type="submit">Sign up</button>
            </form>
        </div>
    )
}

export default SignUp