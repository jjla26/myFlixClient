import React from 'react'
import { useSelector } from 'react-redux'
import { Navbar, Nav, Col, Row, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import useLogOut from '../../hooks/useLogOut'
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import './navigation.scss'

function Navigation() {
  const onLoggedOut = useLogOut()
  const user = useSelector( state => state.user)
  return (
    <Row>
      <Col>
        <Navbar className="navigation" collapseOnSelect expand="lg" bg="secondary" variant="primary" sticky="top">
          <Navbar.Brand as={Link} to='/'>MYFLIX APP</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to='/'>Home</Nav.Link>
              <Nav.Link as={Link} to='/myfavorites'>Favorites</Nav.Link>
            </Nav>
            <Nav>
              <VisibilityFilterInput  />
              <NavDropdown title={`${user}'s Profile`} id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to={`/profile`}>My Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={onLoggedOut}>Log Out</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Col>
    </Row>
  )
}

export default Navigation
