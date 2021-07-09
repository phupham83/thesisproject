import React from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router"
import { signup } from "../../reducers/userReducer"
import { setMessage } from "../../reducers/messageReducer"
import Message from "../Message"

const SignUp = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const handleSignup = (event) => {
        event.preventDefault()
        const username = event.target.Username.value
        const password = event.target.Password.value
        const name = event.target.Name.value
        const cb = () => history.push("/")
        const messageCb = (message) => {dispatch(setMessage(message))}
        dispatch(signup(username, name, password, cb, messageCb))
    }
    return (
        <section className="App h-screen w-full flex justify-center items-center bg-gray-700 ">
            <div className="w-full max-w-md bg-gray-800">
                <Message/>
                <form onSubmit ={handleSignup} className=" bg-white shadow-md rounded px-8 py-8 pt-8">
                    <div className="px-4 pb-4">
                        <label htmlFor="text" className="text-sm block font-bold pb-2">USERNAME</label>
                        <input
                            type="text"
                            name="Username"
                            id ="username"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 "
                            placeholder="John97"
                        />
                    </div>
                    <div className="px-4 pb-4">
                        <label htmlFor="text" className="text-sm block font-bold pb-2">NAME</label>
                        <input
                            type="text"
                            name="Name"
                            id ="name"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 "
                            placeholder="John Pham"
                        />
                    </div>
                    <div className="px-4 pb-4">
                        <label htmlFor="password" className="text-sm block font-bold pb-2">PASSWORD</label>
                        <input
                            type="password"
                            name="Password"
                            id ="password"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300"
                            placeholder="Enter your password"/>
                    </div>
                    <button id ="signup-button" type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sign up</button>
                </form>
            </div>
        </section>
    )
}

export default SignUp