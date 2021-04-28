import React, { useEffect } from 'react'
import { Card, Row, Col, ListGroup, Button } from 'react-bootstrap'

import userlogo from 'url:../../img/user.svg' 
import './profile-view.scss'

function Profile(props){
const { user } = props
console.log(user)

  return (
    <Row className="profile-view d-flex justify-content-center align-items-center">
      <Col md={4}>
        <Card className="profile-card text-center">
          <Card.Img variant="top" className="profile-card__image" src={userlogo} />
          <Card.Body>
            <Button>Update</Button>
          </Card.Body>
        </Card>
      </Col>
      <Col md={8}>
      <Card className="profile-card">
          <ListGroup variant="flush">
            <ListGroup.Item  className="profile-details">Username: {user}</ListGroup.Item>
            <ListGroup.Item  className="profile-details">Email: </ListGroup.Item>
            <ListGroup.Item  className="profile-details">Birdthday: </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default Profile
