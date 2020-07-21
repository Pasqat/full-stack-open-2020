import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};
const createNew = async (content) => {
  const newAnecdote = {
    content,
    votes: 0,
    id: null
  };
  const response = await axios.post(baseUrl, newAnecdote);
  return response.data;
};

const newVote = async (id, vote, content) => {
  const updatedVote = {
    content,
    votes: vote +1 ,
    id
  }
  const response = await axios.put(`${baseUrl}/${id}`, updatedVote);
  return response.data;
};

export default { getAll, createNew, newVote };

