import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import {
  newMessage,
  removeMessage,
  setNotification
} from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const filterList = useSelector((state) => {
    return state.filter;
  });
  const anecdotes = useSelector((state) => {
    console.log(state.anecdotes);
    return state.anecdotes;
  });
  const vote = ({ id, content, votes }) => {
    console.log(id, content);
    dispatch(voteAnecdote(id, votes, content));
    dispatch(setNotification(`you voted '${content}'`, 10000));
  };

  const sortedAnecdotes = anecdotes.sort((a, b) => {
    const votesA = a.votes;
    const votesB = b.votes;
    if (votesA > votesB) return -1;
    if (votesA < votesB) return 1;
    return 0;
  });

  return (
    <div>
      {sortedAnecdotes.map((anecdote) => {
        if (
          anecdote.content
            .toLowerCase()
            .includes(filterList.letters.toLowerCase())
        ) {
          return (
            <div key={anecdote.id}>
              <div>{anecdote.content}</div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
              </div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default AnecdoteList;
