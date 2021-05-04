import React from 'react'
import { Row, Col, Button} from 'react-bootstrap'
import PropTypes from 'prop-types';

import './director-view.scss'
import moment from 'moment'

function DirectorView(props){
  const { director, onBackButton } = props
  return (
    <Row className="director-view d-flex flex-column justify-content-center align-items-center">
      <Col md={10} className="d-flex flex-column justify-content-center align-items-center">
        <Row p={5}>
          <Col className="m-2">
            Name: {director.Name}
          </Col>
        </Row>
        <Row>
          <Col className="m-2">
            Birthdate: {moment(director?.Birth).format('DD-MM-YYYY')}
          </Col>
        </Row>
        <Row>
          <Col className="m-2">
            Description: {director.Bio}
          </Col>
        </Row>
        <Row>
          <Col>
            <Button onClick={onBackButton}>Back</Button>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired
  }),  
  onBackButton: PropTypes.func.isRequired,
};

export default DirectorView
