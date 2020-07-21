const initialState = {
  message: 'Welcome, feel free to add a new anecdote',
  isVisible: true
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NOTIFY': {
      return {
        ...state,
        message: action.data.message,
        isVisible: true
      };
    }
    case 'REMOVE_NOTIFICATION':
      return { ...state, isVisible: false };
    default:
      return state;
  }
};

export const setNotification = (message, timeout) => {
  const timer = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  return async (dispatch) => {
    await dispatch({
      type: 'NOTIFY',
      data: { message }
    });
    await timer(timeout);
   return dispatch({
      type: 'REMOVE_NOTIFICATION'
    });
  };
};

export default reducer;
