import React from "react"
import { Link } from "react-router-dom"
const UnprotectedHome = () => {
    return(
        <div className="flex bg-white h-screen">
            <div className="flex items-center text-center lg:text-left px-8 md:px-12 lg:w-1/2">
                <div>
                    <h2 className="text-3xl font-semibold text-gray-800 md:text-4xl">Personal finance for <span className="text-indigo-600">You</span></h2>
                    <p className="mt-2 text-sm text-gray-500 md:text-base">This application would connect all finances into one covinient dashboard, from which you can start shaping your personal finance.</p>
                    <p className="mt-2 text-sm text-gray-500 md:text-base">The application connects to the Open Banking Project Api to simulate connecting to real banks with Open Banking.</p>
                    <p className="mt-2 text-sm text-gray-500 md:text-base">To see what the application would look like running you can login using:</p>
                    <p className="mt-2 text-sm text-gray-500 md:text-base">Email: testuser@gmail.com Pass: test90</p>
                    <p className="mt-2 text-sm text-gray-500 md:text-base">Or go through the sign up proccess and when asked to log in to Open Banking Project use:</p>
                    <p className="mt-2 text-sm text-gray-500 md:text-base">Username: jaakko.fi.29@example.com Pass: 8132cf </p>
                    <p className="mt-2 text-sm text-gray-500 md:text-base">Please note that the application would require you to verify your email and phone number</p>
                    <div className="flex justify-center lg:justify-start mt-6">
                        <Link to="/login"><span className="px-4 py-3 bg-gray-900 text-gray-200 text-xs font-semibold rounded hover:bg-gray-800">Get Started</span></Link>
                    </div>
                </div>
            </div>
            <div className="hidden lg:block lg:w-1/2 " >
                <div className="h-full object-cover bg-hero-pattern">
                    <div className="h-full bg-black opacity-25"></div>
                </div>
            </div>
        </div>
    )
}

export default UnprotectedHome