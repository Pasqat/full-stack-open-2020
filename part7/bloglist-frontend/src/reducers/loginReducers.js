import loginService from '../services/login'
import storage from '../utils/storage'
import { setNotification } from '../reducers/notificationReducers'

const loginReducers = (state = null, action) => {
  switch (action.type) {
  case 'LOGIN':
    return action.data
  default:
    return state
  }
}

export const userLogin = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login({
      username,
      password
    })

    dispatch({
      type: 'LOGIN',
      data: user
    })
    console.log(user)
    storage.saveUser(user)
    dispatch(setNotification(`${user.name} welcome back!`, 'success', 5000))
  }
}

export const setUser = (user) => {
  console.log('setUser', user)
  return async (dispatch) => {
    dispatch({
      type: 'LOGIN',
      data: user
    })
  }
}

export default loginReducers
