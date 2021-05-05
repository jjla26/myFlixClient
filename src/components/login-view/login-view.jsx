import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { Row, Col, Card, Form, Button, InputGroup, Spinner, Alert } from 'react-bootstrap'
import { PersonFill, KeyFill } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
import { Formik } from 'formik';

import { setError, setUser, setMessage, setMovies, setUserDetails } from '../../redux/actions/actions'
import useRequest from '../../hooks/useRequest'
import './login-view.scss'

function LoginView(props) {
  const dispatch = useDispatch()
  const apiRequest = useRequest()
  const [ loading, setLoading ] = useState(false)

  const validate = values => {
    const errors = {}
    if(!values.username.trim()){
      errors.username = "Username is required"
    }
    if(!values.password){
      errors.password = "Password is required"
    }else if(values.password.length <6){
      errors.password = "Password should be longer than 6 characters"
    }
    return errors
  }

    /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
  const onLoggedIn = authData => {
    dispatch(setUser(authData.data.Username));
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.data.Username);
    getMovies();
    getUserDetails(authData.data.Username, authData.token)
    dispatch(setMessage("You have logged in successfully"))
  }

  const getMovies = async () => {
    try {
      const response = await apiRequest('GET', '/movies')
      dispatch(setMovies(response.data))
    } catch (error) {
      dispatch(setError(error))
    }
  }

  const getUserDetails = async (name) => {
    try {
      const response = await apiRequest('GET', `/users/${name}`)
      dispatch(setUserDetails(response.data))
    } catch (error) {
      dispatch(setError(error))
    }
  }

  const handleSubmit = async (values) => {
    setLoading(true)
    try {
      const response = await apiRequest('POST', '/login', {Username: values.username, Password: values.password}) 
      setLoading(false)
      onLoggedIn(response)
    } catch (error) {
      setLoading(false)
      dispatch(setError(error))
    }
  };

  return (
    <Col>
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
              <Formik
                validate={validate}
                onSubmit={handleSubmit}
                initialValues={{
                  username: '',
                  password: '',
                }}
              >
                {({
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  touched,
                  values,
                  errors,
                }) => (
                <Form>
                  <Form.Group controlId="formUsername">
                    <InputGroup>
                      <InputGroup.Prepend className="login-card__prepend">
                        <PersonFill />
                      </InputGroup.Prepend>
                      <Form.Control 
                        name="username" 
                        isInvalid={touched.username && !!errors.username} 
                        autoComplete="username" 
                        type="text" 
                        placeholder="username" 
                        value={values.username} 
                        onChange={handleChange} 
                        onBlur={handleBlur} />
                      <Form.Control.Feedback type="invalid">
                        {errors.username}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>

                  <Form.Group controlId="formPassword">
                    <InputGroup className="mb-2">
                      <InputGroup.Prepend className="login-card__prepend">
                        <KeyFill />
                      </InputGroup.Prepend>
                      <Form.Control 
                        name="password" 
                        isInvalid={touched.password && !!errors.password} 
                        autoComplete="current-password" 
                        type="password" 
                        placeholder="password" 
                        value={values.password} 
                        onChange={handleChange} 
                        onBlur={handleBlur} />
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                  {loading ? 
                  <Spinner className="float-right" animation="grow" variant="primary"/>
                  :
                  <Button className="float-right" variant="primary" type="submit" onClick={handleSubmit}>
                    LogIn
                  </Button>
                  }
                </Form>)}
              </Formik>
            </Card.Body>
            {!loading && <Card.Footer>Don't you have an account? <Link to='/register'>Sign Up</Link></Card.Footer>}
          </Card>
        </Col>
      </Row>
    </Col>
  );
}

export default LoginView