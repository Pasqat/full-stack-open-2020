import React, {useState} from 'react'

import {useQuery} from '@apollo/client'
import {ALL_BOOKS} from '../queries'
import {genresList} from '../utils/handlers'

const Books = (props) => {

  const [genre, setGenre] = useState(null)

  const result = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>Loading...</div>
  }

  const bookFiltered = result.data.allBooks.filter(book => book.genres.includes(genre))
  const booksView = () =>
    !genre ? result.data.allBooks : bookFiltered

  return (
    <div>
      <h2>books</h2>
      {!genre ? '' : <p>in genre <strong>{genre}</strong></p>}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {booksView().map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {genresList(result.data.allBooks).map(g => <button key={g} onClick={() => setGenre(g)}>{g}</button>)}
      <button onClick={() => setGenre(null)}>all genre</button>
    </div>
  )
}

export default Books
