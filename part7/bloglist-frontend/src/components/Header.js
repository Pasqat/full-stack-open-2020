import React from 'react'
import {
  Tooltip,
  Text,
  Flex,
  Button,
  Box,
  Heading,
  Link
} from '@chakra-ui/core'
import { Link as routeLink } from 'react-router-dom'

const MenuItems = ({ children }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
)

const Header = ({ user, handleLogout }) => {
  const [show, setShow] = React.useState(false)
  const handleToggle = () => setShow(!show)

  if (!user) {
    return null
  }

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="teal.500"
      color="white"
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={'-.1rem'}>
          <Link as={routeLink} to="/">
            Blog App
          </Link>
        </Heading>
      </Flex>
      <Box display={{ base: 'block', md: 'none' }} onClick={handleToggle}>
        <svg
          fill="white"
          width="12px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>

      <Box
        display={{ sm: show ? 'block' : 'none', md: 'flex' }}
        width={{ sm: 'full', md: 'auto' }}
        alignItems="center"
        flexGrow={1}
      >
        <MenuItems>
          <Link as={routeLink} to="/blogs">
            Blogs
          </Link>
        </MenuItems>
        <MenuItems>
          <Link as={routeLink} to="/users">
            Users
          </Link>
        </MenuItems>
      </Box>

      <Box
        display={{ sm: show ? 'block' : 'none', md: 'block' }}
        mt={{ base: 4, md: 0 }}
      >
        <Tooltip hasArrow label="Log Out" placement="bottom" bg="red.600">
          <Button onClick={handleLogout} bg="transparent" border="1px">
            {user.name}
          </Button>
        </Tooltip>
      </Box>
    </Flex>
  )
}

export default Header
