
import React, {useState, useEffect} from 'react'

import {useQuery, useMutation} from '@apollo/client'
import {ALL_AUTHORS, EDIT_AUTHOR} from '../queries'

const SetBirthyear = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [editAuthor, result] = useMutation(EDIT_AUTHOR)

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      alert('Author not found')
    }
  }, [result.data]) // eslint-disable-line

  const submit = (event) => {
    event.preventDefault()

    editAuthor({variables: {name, setBornTo: Number(born)}})


    setName('')
    setBorn('')
  }

  return (
    <div>
      <h3>Set Birthyear</h3>
      <form onSubmit={submit}>
        <div>
          name: <input type="text"
            value={name}
            onChange={({target}) => setName(target.value)} />
        </div>
        <div>
          born: <input type="text"
            value={born}
            onChange={({target}) => setBorn(target.value)} />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null
  }

  const authors = []
  if (result.loading) {
    return <div> Loading... </div>
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {result.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <SetBirthyear />
    </div>
  )
}

export default Authors
