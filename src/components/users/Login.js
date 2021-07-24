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
        const email = event.target.Email.value
        const password = event.target.Password.value
        const cb = () => history.push("/")
        const messageCb = (message) => {dispatch(setMessage(message))}
        dispatch(login(email,password, cb, messageCb))
    }
    const inputStyle = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 "
    return (
        <section className="App h-screen w-full flex justify-center items-center bg-gray-700 ">
            <div className="w-full max-w-md bg-gray-800">
                <Message />
                <form onSubmit={handleLogin} className=" bg-white shadow-md rounded px-8 py-8 pt-8">
                    <div className="px-4 pb-4">
                        <label htmlFor="text" className="text-sm block font-bold pb-2">EMAIL</label>
                        <input
                            type="text"
                            name="Email"
                            id ="email"
                            className={inputStyle}
                            placeholder="John97@gmail.com"
                        />
                    </div>
                    <div className="px-4 pb-4">
                        <label htmlFor="password" className="text-sm block font-bold pb-2">PASSWORD</label>
                        <input
                            type="password"
                            name="Password"
                            id="password"
                            className={inputStyle}
                            placeholder="Enter your password"
                        />
                    </div>
                    <button id ="login-button"type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Login</button>
                </form>
            </div>
        </section>
    )
}

export default Login