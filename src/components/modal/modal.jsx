import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import PropTypes from 'prop-types';

function CustomModal(props) {
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

CustomModal.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  button: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default CustomModal
