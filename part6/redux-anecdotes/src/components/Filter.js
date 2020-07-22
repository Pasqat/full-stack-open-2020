import React from 'react'
import { filtering } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = (props) => { 

  const handleChange = (event) => {
    console.log(event.target.value)
    props.filtering(event.target.value)
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

const mapDispatchToProps = { 
  filtering
}
export default connect(null, mapDispatchToProps)(Filter)
