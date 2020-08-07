import React from 'react'
import { Link as routerLink } from 'react-router-dom'
import { Heading, Text, Flex, Box, Grid, Link } from '@chakra-ui/core'

const Users = ({ users }) => {
  return (
    <Box m={5} p={5}>
      <Heading>Users </Heading>
      <Text mb={5}>blogs added</Text>
      <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        {users.map((user) => {
          return (
            <Flex
              p={5}
              mt={2}
              shadow="md"
              borderWidth="1px"
              key={user.id}
              justify="space-between"
            >
              <Link
                as={routerLink}
                to={`/users/${user.id}`}
                color="green.500"
                textDecoration="underline"
                mr={5}
              >
                {user.name}
              </Link>
              <Text>{user.blogs.length}</Text>
            </Flex>
          )
        })}
      </Grid>
    </Box>
  )
}

export default Users
