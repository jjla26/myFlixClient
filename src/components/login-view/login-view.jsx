import React, { useState } from 'react';
import { Container, Card, Form, Button, InputGroup } from 'react-bootstrap'
import { PersonFill, KeyFill } from 'react-bootstrap-icons'

import './login-view.scss'

function LoginView(props) {
  const { setRegister, onLoggedIn } = props
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onLoggedIn({
      Username: username, 
      Password: password
    });
  };

  return (
    <Container className="login-view d-flex flex-column justify-content-center align-items-center" fluid>
      <h1>MyFlix</h1>
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
            <Button className="float-right" variant="primary" type="submit" onClick={handleSubmit}>
              LogIn
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer>Don't you have an account? <a href="#" onClick={() => setRegister(true)}>Sign Up</a></Card.Footer>
      </Card>
    </Container>
  );
}

export default LoginView