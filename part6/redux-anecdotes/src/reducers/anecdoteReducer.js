import anecdoteService from '../services/anecdotes';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_VOTE': {
      const id = action.data.id;
      const anecdoteToChange = state.find((n) => n.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      };
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedAnecdote
      );
    }
    case 'NEW_ANECDOTE': {
      const newAnecdote = action.data;
      return [...state, newAnecdote];
    }
    case 'INIT_ANECDOTES':
      return action.data;
    default:
      return state;
  }
};

export const voteAnecdote = (id, votes, content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.newVote(id, votes, content);
    dispatch({
      type: 'ADD_VOTE',
      data: {
        content: anecdote.content,
        votes: votes + 1,
        id: anecdote.id
      }
    });
  };
};

export const newAnecdote = (content) => {
  return async (dispatch) => {
    const anecdoteToAdd = await anecdoteService.createNew(content);
    dispatch({
      type: 'NEW_ANECDOTE',
      data: {
        content: anecdoteToAdd.content,
        votes: 0,
        id: anecdoteToAdd.id
      }
    });
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    });
  };
};

export default reducer;
