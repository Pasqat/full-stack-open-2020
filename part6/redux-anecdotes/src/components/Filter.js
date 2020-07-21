import React from 'react'
import { filtering } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const Filter = () => { 
  const dispatch = useDispatch()

  const handleChange = (event) => {
    console.log(event.target.value)
    dispatch(filtering(event.target.value))
  }
  const style = {
    marginBottom : 10
  }

  return (
    <div style={style}>
        filter <input onChange={handleChange} name='filter'/>
    </div>
  )
}

export default Filter
