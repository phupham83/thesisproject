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

export const login = (username, password) => {
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
          } catch (exception) {
              alert("wrong username or password")
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

export const logout = () => {
  return ( dispatch =>
    {dispatch ({
      type: "LOGOUT"
    })}
  )
}

  export default loginReducer