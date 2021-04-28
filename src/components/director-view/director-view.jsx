import React from 'react'
import { Row, Col, Button} from 'react-bootstrap'

import './director-view.scss'

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
            Birthdate: {director?.Birth}
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

export default DirectorView
