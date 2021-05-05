import React from 'react'
import { Spinner, Row, Col } from 'react-bootstrap'

import './loading.scss'

function Loading() {
  return (
    <Row>
      <Col className="loading-view">
        <Spinner animation="grow" variant="primary"/>
      </Col>
    </Row>
  )
}

export default Loading
