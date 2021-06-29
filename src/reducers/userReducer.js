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

export default userReducer