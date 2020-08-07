import React from 'react'
import PropTypes from 'prop-types'
import { Link as routerLink } from 'react-router-dom'
import { Text, Box, Link } from '@chakra-ui/core'

const Blog = ({ blog }) => {
  return (
    <Box p={5} mt={2} mr={5} ml={5} shadow="md" borderWidth="1px">
      <Text>
        <Link
          as={routerLink}
          to={`/blogs/${blog.id}`}
          color="green.500"
          textDecoration="underline"
        >
          {blog.title}
        </Link>{' '}
        by {blog.author}{' '}
      </Text>
    </Box>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired
  }).isRequired
}

export default Blog
