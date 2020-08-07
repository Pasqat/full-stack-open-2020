import React, { useState, useImperativeHandle } from 'react'
import { Box, Button } from '@chakra-ui/core'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <Box p={4} m={4}>
      <Box style={hideWhenVisible}>
        <Button variantColor="blue" onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </Box>
      <Box style={showWhenVisible} className="togglableContent">
        {props.children}
        <Button variantColor="red" onClick={toggleVisibility}>
          cancel
        </Button>
      </Box>
    </Box>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable
