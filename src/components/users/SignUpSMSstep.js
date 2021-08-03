import React from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router"
import { setMessage } from "../../reducers/messageReducer"
import { verifySMS, reSendSMS } from "../../reducers/signUpReducer"
import Message from "../Message"

const SignUpSMSstep = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const messageCb = (message) => {dispatch(setMessage(message))}
    const handleSMSconfirm = (event) => {
        event.preventDefault()
        const code = event.target.Code.value
        const cb = () => history.push("/verified")
        dispatch(verifySMS(code, cb, messageCb))
    }
    const handleReSend = (event) => {
        event.preventDefault()
        dispatch(reSendSMS(messageCb))
    }
    const handleRedirect = (event) => {
        event.preventDefault()
        history.push("/changeNumber")
    }
    return(
        <div className ="flex justify-center">
            <div className ="w-1/2 bg-hero-pattern-login bg-center bg-no-repeat bg-cover"></div>
            <section className="App h-screen w-full flex justify-center items-center bg-gray-100 ">
                <div className="w-full max-w-md bg-gray-800">
                    <Message/>
                    <p className = "text-white bold md:text-center pb-4">Step 3. SMS verification</p>
                    <form onSubmit ={handleSMSconfirm} className=" bg-white shadow-md rounded px-8 py-8 pt-8">
                        <div className="px-4 pb-4">
                            <p className = "text-black bold  ">Your email account has been verified</p>
                            <p className = "text-black bold  ">Please enter the code sent to your phone to continue</p>
                        </div>
                        <div className="px-4 pb-4">
                            <label htmlFor="text" className="text-sm block font-bold pb-2">CODE</label>
                            <input
                                type="number"
                                name="Code"
                                id ="code"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 "
                            />
                        </div>
                        <button id ="confirm-button" type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4">Confirm</button>
                        <button id ="resend-button" onClick={handleReSend} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-8">Re-send SMS</button>
                        <div className="px-4 pb-4">
                            <p className = "text-black bold  ">Want to use a different number ?</p>
                        </div>
                        <button id ="changeNumber-button" onClick={handleRedirect} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4">Change Number</button>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default SignUpSMSstep