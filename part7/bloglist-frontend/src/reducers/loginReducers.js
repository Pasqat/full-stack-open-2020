import loginService from '../services/login'

const loginReducers = (state = null, action) => {
  switch (action.type) {
  case 'LOGIN':
    return action.data
  default:
    return state
  }
}

export const userLogin = (username, password) => {
  console.log('username', username, 'password', password)
  return async (dispatch) => {
    const user = await loginService.login({
      username,
      password
    })
    dispatch({
      type: 'LOGIN',
      data: user
    })
  }
}

export const setUser = (user) => {
  return async (dispatch) => {
    dispatch({
      type: 'LOGIN',
      data: user
    })
  }
}

export default loginReducers
