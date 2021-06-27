import loginService from "../services/login"

const loginReducer = (state = null, action) =>{
    switch (action.type) {
        case "LOGIN":
            return action.data
        case "LOCAL_LOGIN":
            return action.data
        case "LOGOUT":
            return null
        default:
            console.log("")
    }
    return state
}

export const login = (username, password, cb) => {
    return async dispatch => {
      try {
        
        const user = await loginService.login({
            username, password,
        })
        window.localStorage.setItem(
            "loggedUser", JSON.stringify(user)
        )
        
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

export const localLogin = (user) => {
  return ( dispatch =>
    {dispatch ({
      type: "LOCAL_LOGIN",
      data: user
    })}
  )
}

export const logout = (cb) => {
  return ( dispatch =>
    {
      window.localStorage.clear()
      dispatch ({
      type: "LOGOUT"
      })
      cb()
    }
  )
}

  export default loginReducer