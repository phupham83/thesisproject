import React from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router"
import { setMessage } from "../../reducers/messageReducer"
import { verifySMS } from "../../reducers/signUpReducer"
import Message from "../Message"
const SignUpSMSstep = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const handleSMSconfirm = (event) => {
        event.preventDefault()
        const code = event.target.Code.value
        const cb = () => history.push("/verified")
        const messageCb = (message) => {dispatch(setMessage(message))}
        dispatch(verifySMS(code, cb, messageCb))
    }
    return(
        <section className="App h-screen w-full flex justify-center items-center bg-gray-700 ">
            <div className="w-full max-w-md bg-gray-800">
                <Message/>
                <p className = "text-white bold md:text-center pb-4">Step 3. SMS verification</p>
                <form onSubmit ={handleSMSconfirm} className=" bg-white shadow-md rounded px-8 py-8 pt-8">
                    <p className = "text-black bold ">Your email account has been verified</p>
                    <p className = "text-black bold ">Please enter the code sent to your phone to continue</p>
                    <div className="px-4 pb-4">
                        <label htmlFor="text" className="text-sm block font-bold pb-2">CODE</label>
                        <input
                            type="number"
                            name="Code"
                            id ="code"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 "
                        />
                        <button id ="signup-button" type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4">Confirm</button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default SignUpSMSstep