const notificationReducers = (state = null, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.data
  case 'REMOVE_NOTIFICATION':
    return null
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
      console.log('per', timeoutID)
      clearTimeout(timeoutID)
    }

    dispatch(notify(message, notificationType))
    timeoutID = setTimeout(() => {
      removeNotification()
    }, 5000)
    console.log('post', timeoutID)
  }
}

export default notificationReducers
