import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './navigation.scss'

function Navigation(props) {
  const { user } = props
  return (
    <Navbar className="navigation" collapseOnSelect expand="lg" bg="secondary" variant="primary" sticky="top">
      <Navbar.Brand as={Link} to='/'>MYFLIX APP</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to='/'>Home</Nav.Link>
          <Nav.Link as={Link} to='/myfavorites'>Favorites</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link as={Link} to='/profile'>{user}'s Profile</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation
