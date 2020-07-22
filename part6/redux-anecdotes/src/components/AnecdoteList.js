import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';
import { connect } from 'react-redux';

const AnecdoteList = (props) => {
  // const dispatch = useDispatch();

  // const filterList = useSelector((state) => {
  //   return state.filter;
  // });
  // const anecdotes = useSelector((state) => {
  //   return state.anecdotes;
  // });
  const vote = ({ id, content, votes }) => {
    props.voteAnecdote(id, votes, content);
    props.setNotification(`you voted '${content}'`, 5000);
  };

  const sortedAnecdotes = props.anecdotes.sort((a, b) => {
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
            .includes(props.filterList.letters.toLowerCase())
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

const mapStateToProps = (state) => {
  // Beacause all love logs!
  console.log( 'State', state)
  return {
    filterList: state.filter,
    anecdotes: state.anecdotes
  };
};


const mapDispatchToProps = {
  voteAnecdote,
  setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
