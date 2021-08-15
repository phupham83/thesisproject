import userService from "../services/users"

const signUpReducer = (state = null, action) => {
    switch(action.type){
    case "SIGN_UP":
        return action.data
    case "CHECK_EMAIL_VERIFIED":
        return state
    case "VERIFY_SMS":
        return state
    case "CHANGE_NUMBER":
        return state
    case "RESEND_SMS":
        return state
    case "RESEND_EMAIL":
        return state
    default:
        return state
    }
}

export const checkEmailVerified = (cb, messageCb) => {
    return async dispatch => {
        try {
            const response = await userService.checkEmailVerified()
            dispatch({
                type: "CHECK_EMAIL_VERIFIED"
            })
            if(response.verified) {
                cb()
            }else{
                messageCb("Your email has not been verified, please verifiy your email to continue")
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const verifySMS = (code, cb, messageCb) => {
    return async dispatch => {
        try{
            const response = await userService.verifySMS(code)
            dispatch({
                type: "VERIFY_SMS"
            })
            if (response.SMSverified){
                cb()
            }else{
                console.log(code)
                messageCb("Wrong code")
            }
        }catch (e) {
            console.log(e)
            console.log(code)
            messageCb("Wrong code")
        }
    }
}

export const reSendSMS = (messageCb) => {
    return async dispatch => {
        try {
            const response = await userService.reSendSMS()
            dispatch({
                type: "RESEND_SMS"
            })
            if(response.sent){
                messageCb("Code Sent")
            }
        } catch (e) {
            console.log(e)
        }
    }
}
export const reSendEmail = (messageCb) => {
    return async dispatch => {
        try {
            const response = await userService.reSendEmail()
            dispatch({
                type: "RESEND_EMAIL"
            })
            if(response.sent){
                messageCb("Email Sent")
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const changeNumber = (number,cb, messageCb) => {
    return async dispatch => {
        try {
            const response = await userService.changeNumber( { number })
            dispatch({
                type: "CHANGE_NUMBER"
            })
            if(response.numberChanged){
                messageCb("Number Changed")
                cb()
            }
        } catch (e) {
            console.log(e)
            if(e.response.data.error){
                messageCb(e.response.data.error)
            }
        }
    }
}

export const signup = (email, name, number, password,cb, messageCb) => {
    return async dispatch => {
        try {
            await userService.signup({
                email, name, number, password,
            })
            dispatch({
                type: "SIGN_UP",
                data: email
            })
            cb()
        } catch (e) {
            console.log(e.response.data.error)
            if(e.response.data.error){
                messageCb(e.response.data.error)
            }
        }
    }
}
export default signUpReducer