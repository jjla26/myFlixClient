import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, Form, Button, InputGroup, Spinner, Alert } from 'react-bootstrap'
import { PersonFill, KeyFill } from 'react-bootstrap-icons'

import useRequest from '../../hooks/useRequest'
import './login-view.scss'

function LoginView(props) {
  const { onLoggedIn } = props
  const apiRequest = useRequest()
  const [ loading, setLoading ] = useState(false)
  const [ error, setError ] = useState(false)
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await apiRequest('POST', '/login', {Username: username, Password: password}) 
      setLoading(false)
      onLoggedIn(response)
    } catch (error) {
      setLoading(false)
      setError(error)
    }
  };

  return (
    <Row className="login-view">
      <Col className="d-flex justify-content-center align-items-center" xs={12}>
        <h1>MyFlix</h1>
      </Col>
      <Col className="d-flex justify-content-center" xs={12}>
        <Card className="login-card">
          <Card.Header className="login-card__header">
            Sign In
          </Card.Header>
          <Card.Body>
            <Form>
              <Form.Group controlId="formUsername">
                <InputGroup>
                  <InputGroup.Prepend className="login-card__prepend">
                    <PersonFill />
                  </InputGroup.Prepend>
                  <Form.Control autoComplete="username" type="text" placeholder="username" value={username} onChange={e => setUsername(e.target.value)}  />
                </InputGroup>
              </Form.Group>

              <Form.Group controlId="formPassword">
                <InputGroup className="mb-2">
                  <InputGroup.Prepend className="login-card__prepend">
                    <KeyFill />
                  </InputGroup.Prepend>
                  <Form.Control autoComplete="current-password" type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)}/>
                </InputGroup>
              </Form.Group>
              {loading ? 
              <Spinner className="float-right" animation="grow" variant="primary"/>
              :
              <Button className="float-right" variant="primary" type="submit" onClick={handleSubmit}>
                LogIn
              </Button>
              }
            </Form>
          </Card.Body>
          {!loading && <Card.Footer>Don't you have an account? <a href="#" onClick={() => setRegister(true)}>Sign Up</a></Card.Footer>}
        </Card>
      </Col>
      <Alert show={!!error} className="error-message" variant="primary">{error}</Alert>
    </Row>
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};

export default LoginView