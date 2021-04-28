import React, { useState } from 'react';
import { Row, Col, Card, Form, Button, InputGroup, Spinner, Alert } from 'react-bootstrap'
import { PersonFill, KeyFill, Calendar2DateFill } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

import useRequest from '../../hooks/useRequest'
import './registration-view.scss'

function RegistrationView(props) {
  const history = useHistory()
  const apiRequest = useRequest()
  const [ loading, setLoading ] = useState(false)
  const [ error, setError ] = useState(false)
  const [ username, setUsername ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ passwordConfirmation, setPasswordConfirmation ] = useState('');
  const [ birthday, setBirthday ] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true)
    try {
      await apiRequest('POST', '/users', {
        Username: username, 
        Email: email, 
        Password: password, 
        Birthday: birthday 
      }) 
      setLoading(false)
      history.push('/')
    } catch (error) {
      setLoading(false)
      setError(error)
    }
  };

  return (
    <Row className="registration-view">
      <Col className="d-flex flex-column justify-content-center align-items-center" xs={12}>
        <h1>MyFlix</h1>
      </Col>
      <Col className="d-flex flex-column justify-content-center align-items-center" xs={12}>
        <Card className="registration-card">
          <Card.Header className="registration-card__header">
            Sign Up
          </Card.Header>
          <Card.Body>
            <Form>
              <Form.Group controlId="formUsername">
                <InputGroup>
                  <InputGroup.Prepend className="registration-card__prepend">
                    <PersonFill />
                  </InputGroup.Prepend>
                  <Form.Control type="text" placeholder="username" value={username} onChange={e => setUsername(e.target.value)}  />
                </InputGroup>
              </Form.Group>

              <Form.Group controlId="formEmail">
                <InputGroup>
                  <InputGroup.Prepend className="registration-card__prepend">
                    @
                  </InputGroup.Prepend>
                  <Form.Control type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)}  />
                </InputGroup>
              </Form.Group>

              <Form.Group controlId="formPassword">
                <InputGroup className="mb-2">
                  <InputGroup.Prepend className="registration-card__prepend">
                    <KeyFill />
                  </InputGroup.Prepend>
                  <Form.Control autoComplete="new-password" type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)}/>
                </InputGroup>
              </Form.Group>

              <Form.Group controlId="formPasswordConfirmation">
                <InputGroup className="mb-2">
                  <InputGroup.Prepend className="registration-card__prepend">
                    <KeyFill />
                  </InputGroup.Prepend>
                  <Form.Control autoComplete="current-password" type="password" placeholder="passwordConfirmation" value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)}/>
                </InputGroup>
              </Form.Group>

              <Form.Group controlId="formBirthday">
                <InputGroup>
                  <InputGroup.Prepend className="registration-card__prepend">
                    <Calendar2DateFill />
                  </InputGroup.Prepend>
                  <Form.Control type="date" placeholder="birthday" value={birthday} onChange={e => setBirthday(e.target.value)}  />
                </InputGroup>
              </Form.Group>

              {loading ? 
              <Spinner className="float-right" animation="grow" variant="primary"/>
              :
              <Button className="float-right" variant="primary" type="submit" onClick={handleSubmit}>
                SignUp
              </Button>}
            </Form>
          </Card.Body>
          {!loading &&<Card.Footer>Do you have an account? <Link to='/'>Sign In</Link></Card.Footer>}
        </Card>
      </Col>
      <Alert show={!!error} className="error-message" variant="primary">{error}</Alert>
    </Row>
  );
}

export default RegistrationView