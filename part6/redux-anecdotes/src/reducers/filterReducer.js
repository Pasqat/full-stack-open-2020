const reducer = (state = { letters: ''}, action) => {
  if (action.type === 'FILTER') return action.data
  return state
}

export const filtering = (letters) => {
  return {
    type: 'FILTER',
    data: { letters }
  }
}

export default reducer
