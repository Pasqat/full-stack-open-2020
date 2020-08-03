import axios from 'axios'

const baseUrl = '/api/users'

// const getConfig = () => {
//   return {
//     headers: { Authorization: `bearer ${storage.loadUser().token}` }
//   }
// }

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { getAll }
