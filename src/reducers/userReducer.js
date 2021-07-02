import userService from "../services/users"

const userReducer = (state = null, action) =>{
    switch (action.type) {
        case "LOGIN":
          return action.data
        case "LOCAL_LOGIN":
          return action.data
        case "LOGOUT":
          return null
        case "SIGN_UP":
          console.log(action.data)
          return state
        case "GET_CONSENT":
          console.log(action.data)
          return state
        case "GET_ACCOUNTS":
          const newState = {...state, accounts: action.data}
          return newState
        default:
            console.log("")
    }
    return state
}

export const login = (username, password, cb) => {
    return async dispatch => {
      try {
        
        const user = await userService.login({
            username, password,
        })
        
        dispatch ({
          type: 'LOGIN',
          data: user,
        })
        cb()
          } catch (exception) {
              console.log(exception)
          }   
    }
  }

export const localLogin = () => {
  return ( async dispatch =>
    {
      const user = await userService.localLogin()
      dispatch ({
      type: "LOCAL_LOGIN",
      data: user
    })}
  )
}

export const logout = (cb) => {
  return ( async dispatch =>
    {
      await userService.logOut()
      dispatch ({
      type: "LOGOUT"
      })
      cb()
    }
  )
}

export const signup = (username, name, password,cb) =>{
  return async dispatch =>{
      try {
          const response = await userService.signup({
              username, name, password,
          })
          dispatch({
              type: "SIGN_UP",
              data: response
          })
          cb()
      } catch (e) {
          console.log(e)
      }
  }
}

export const getConsent = ()=>{
  return async dispatch =>{
    try {
      const response = await userService.getConsent()
      dispatch({
        type: "GET_CONSENT",
        data: response
      })
    } catch (e) {
      console.log(e)
    }
  }
}

export const getAccounts = (user) => {
  if(user.consent){
  return async dispatch =>{
    try {
      const response = await userService.getAccounts(user.id)
      dispatch({
        type: "GET_ACCOUNTS",
        data: response
      })
    } catch (e) {
      console.log(e)
    }
  }} else{
    return async dispatch =>{
      try {
        const response = null
        dispatch({
          type: "GET_ACCOUNTS",
          data: response
        })
      } catch (e) {
        console.log(e)
      }}
  }
}


export default userReducer