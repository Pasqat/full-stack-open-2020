import React, {useState, useEffect} from 'react'

import {useQuery, useLazyQuery} from '@apollo/client'
import {ALL_BOOKS, GET_GENRES} from '../queries'
import {genresList} from '../utils/handlers'

const Books = (props) => {
  const [getBook, result] = useLazyQuery(ALL_BOOKS)
  const [genres, setGenres] = useState(null)

  const {data} = useQuery(GET_GENRES)

  useEffect(() => {
    if (result.data) {
      setGenres(result.data.allBooks)
    }
  }, [result.data])

  const showByGenre = (genre) => {
    getBook({variables: {genre}})
  }

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>Loading...</div>
  }

  // const bookFiltered = result.data.allBooks.filter(book => book.genres.includes(genre))
  // const booksView = () =>
  //   !genre ? result.data.allBooks : bookFiltered

  console.log('data', data)
  console.log('genres', genres)
  console.log('result.data', result.data)
  const genresButtons = () => {
    return (
      <div>
        {genresList(data.allBooks).map(g => <button key={g}
          onClick={() => showByGenre(g)}>{g}</button>)}
        <button onClick={() => showByGenre('')}>all genres</button>
      </div>
    )
  }

  if (!genres) {
    return (
      <div>
        <h2>books</h2>
        <p>select a genres to see the related books</p>
        {genresButtons()}
      </div>
    )
  }

  // {!genres ? '' : <p>in genre <strong>{genres}</strong></p>}
  return (
    <div>
      <h2>books</h2>
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
          {genres.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {genresButtons()}
    </div>
  )
}

export default Books
