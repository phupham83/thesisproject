import React from "react"

const Button = ({ cb, text }) => {
    return(
        <button onClick ={cb} className ="px-4 py-3 bg-gray-200 text-gray-500 text-xs font-semibold rounded hover:bg-gray-600 hover:text-white">{text}</button>
    )
}

export default Button