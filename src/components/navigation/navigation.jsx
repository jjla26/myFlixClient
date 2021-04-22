import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import './navigation.scss'

function Navigation(props) {
  const { user } = props
  return (
    <Navbar className="navigation" collapseOnSelect expand="lg" bg="secondary" variant="primary" sticky="top">
      <Navbar.Brand href="#">MYFLIX APP</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#">Home</Nav.Link>
          <Nav.Link href="#">Favorites</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href="#">{user.Username}'s Profile</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation
