import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import './footer.scss'

export default function Footer() {
  return (
    <Row className="footer">
      <Col className="d-flex justify-content-center align-items-center">
        <h6 className="text-muted">Copyright © 2021 by Julio López</h6>
      </Col>
    </Row>
  )
}
