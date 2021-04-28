import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'

import './genre-view.scss'

function GenreView(props){
  const { genre, onBackButton } = props
  return (
    <Row className="genre-view">
      <Col md={12} className="d-flex flex-column justify-content-center align-items-center">
        <Row p={5}>
          <Col className="m-2">
            Name: {genre.Name}
          </Col>
        </Row>
        <Row>
          <Col className="m-2">
            Description: {genre.Description}
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

export default GenreView
