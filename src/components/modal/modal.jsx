import React from 'react'
import { Modal, Button } from 'react-bootstrap'

export default function CustomModal(props) {
  const { title, body, action, button, show, handleClose} = props

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>  
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={action}>
          {button}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
