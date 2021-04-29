import React, { useState } from 'react'
import { Card, Row, Col, ListGroup, Button, Spinner, Alert } from 'react-bootstrap'

import useRequest from '../../hooks/useRequest' 
import userlogo from 'url:../../img/user.svg' 
import Modal from '../modal/modal' 
import './profile-view.scss'

function Profile(props){
  const apiRequest = useRequest()
  const { userDetails, onLoggedOut } = props
  const [ error, setError ] = useState(null)
  const [ loading, setLoading ] = useState(false)
  const [ showModal, setShowModal ] = useState(false) 

  onDeleteAcc = async () => {
    setLoading(true)
    try {
      await apiRequest('DELETE', `/users/${userDetails.Username}`)
      setLoading(false)
      onLoggedOut()
    } catch (error) {
      console.log(error)
      setLoading(false)
      setShowModal(true)
      setError(error)
    }
  }

  return (
    <Row className="profile-view d-flex justify-content-center align-items-center">
      <Col md={4}>
        <Card className="profile-card text-center">
          <Card.Img variant="top" className="profile-card__image" src={userlogo} />
          {loading ? <Card.Body>
            <Spinner animation="grow" variant="primary"/>
          </Card.Body>
          :
          <Card.Body>
            <Button className="m-2">Update</Button>
            <Button variant="danger" className="m-2" onClick={() => setShowModal(true)}>Delete my account</Button>
          </Card.Body>}
        </Card>
      </Col>
      <Col md={8}>
      <Card className="profile-card">
          <ListGroup variant="flush">
            <ListGroup.Item  className="profile-details">Username: {userDetails.Username}</ListGroup.Item>
            <ListGroup.Item  className="profile-details">Email: {userDetails.Email}</ListGroup.Item>
            <ListGroup.Item  className="profile-details">Birdthday: {userDetails.Birthday}</ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
      <Modal 
        title="Confirmation"
        body="Are you sure you want to delete your account?"
        button="Confirm"
        action={onDeleteAcc}
        handleClose={() => setShowModal(false)}
        show={showModal}
      />
      <Alert show={!!error} className="error-message" variant="secondary">{error}</Alert>
    </Row>
  )
}

export default Profile
