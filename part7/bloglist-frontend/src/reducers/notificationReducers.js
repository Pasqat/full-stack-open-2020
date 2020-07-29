const notificationReducers = (state = '', action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.data
  case 'REMOVE_NOTIFICATION':
    return {
      ...state,
      message: '',
      notificationType: null
    }
  default:
    return state
  }
}

const notify = (message, notificationType = 'success') => {
  return {
    type: 'SET_NOTIFICATION',
    data: { message, notificationType }
  }
}

const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION'
  }
}

let timeoutID
export const setNotification = (message, notificationType, timeout) => {
  return (dispatch) => {
    if (timeoutID) {
      clearTimeout(timeoutID)
    }

    dispatch(notify(message, notificationType))
    timeoutID = setTimeout(() => {
      removeNotification()
    }, timeout)
  }
}

export default notificationReducers
