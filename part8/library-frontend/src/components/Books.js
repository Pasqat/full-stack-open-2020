import React, {useState, useEffect} from 'react'

import {useQuery, useLazyQuery} from '@apollo/client'
import {ALL_BOOKS, GET_GENRES} from '../queries'
import {genresList} from '../utils/handlers'

const Books = (props) => {
  const [getBook, result] = useLazyQuery(ALL_BOOKS)
  const [genres, setGenres] = useState(null)
  const [genre, setGenre] = useState('')

  const {data} = useQuery(GET_GENRES)

  useEffect(() => {
    if (result.data) {
      setGenres(result.data.allBooks)
    }
    if (!genre) {
      showByGenre('')
    }
  }, [result.data, genre])

  const showByGenre = (genreToShow) => {
    getBook({variables: {genreToShow}})
    setGenre(genreToShow)
  }

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>Loading...</div>
  }

  const genresButtons = () => {
    return (
      <div>
        {genresList(data.allBooks).map(g => <button key={g}
          onClick={() => showByGenre(g)}>{g}</button>)}
        <button onClick={() => showByGenre('')}>all genres</button>
      </div>
    )
  }

  return (
    <div>
      <h2>books</h2>
      {!genres ? '' : <p>in genre <strong>{genre}</strong></p>}
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
