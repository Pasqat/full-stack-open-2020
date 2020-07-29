const initialState = {
  message: 'Welcome, feel free to add a new anecdote',
  isVisible: true,
  notificationID: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NOTIFY': {
      return {
        ...state,
        message: action.data.message,
        isVisible: true,
        notificationID: action.data.notificationID
      };
    }
    case 'REMOVE_NOTIFICATION':
      return { ...state, isVisible: false };
    default:
      return state;
  }
};

const notify = (message) => {
  return {
    type: 'NOTIFY',
    data: { message }
  };
};

const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION'
  };
};

let timeoutID;
export const setNotification = (message, timeout) => {
  return (dispatch) => {
    if (timeoutID) {
      console.log('pre', timeoutID);
      clearTimeout(timeoutID);
    }
    dispatch(notify(message));
    timeoutID = setTimeout(() => {
      dispatch(removeNotification());
    }, timeout);
    console.log('post', timeoutID);
  };
};

export default reducer;
