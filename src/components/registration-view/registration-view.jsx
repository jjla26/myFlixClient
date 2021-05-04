import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { Row, Col, Card, Form, Button, InputGroup, Spinner, Alert } from 'react-bootstrap'
import { PersonFill, KeyFill, Calendar2DateFill } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { Formik } from 'formik';

import { setError, setMessage } from '../../redux/actions/actions'
import Validation from '../../utils/registerValidation'
import useRequest from '../../hooks/useRequest'
import './registration-view.scss'

function RegistrationView(props) {
  const dispatch = useDispatch()
  const history = useHistory()
  const apiRequest = useRequest()
  const [ loading, setLoading ] = useState(false)

  const handleSubmit = async values => {
    setLoading(true)
    try {
      await apiRequest('POST', '/users', {
        Username: values.username, 
        Email: values.email, 
        Password: values.password, 
        Birthday: values.birthday 
      }) 
      setLoading(false)
      dispatch(setMessage("Great! Now you can log in"))
      history.push('/')
    } catch (error) {
      setLoading(false)
      dispatch(setError(error))
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
            <Formik
                validate={Validation}
                onSubmit={handleSubmit}
                initialValues={{
                  username: '',
                  email: '',
                  password: '',
                  passwordConfirmation: '',
                  birthday: '',
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
                        <InputGroup.Prepend className="registration-card__prepend">
                          <PersonFill />
                        </InputGroup.Prepend>
                        <Form.Control 
                          isInvalid={touched.username && !!errors.username} 
                          name="username" type="text" placeholder="username" 
                          value={values.username} 
                          onChange={handleChange} 
                          onBlur={handleBlur}  />
                        <Form.Control.Feedback type="invalid">
                            {errors.username}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>

                    <Form.Group controlId="formEmail">
                      <InputGroup>
                        <InputGroup.Prepend className="registration-card__prepend">
                          @
                        </InputGroup.Prepend>
                        <Form.Control 
                          isInvalid={touched.email && !!errors.email} 
                          name="email" type="email" placeholder="email" 
                          value={values.email} 
                          onChange={handleChange} 
                          onBlur={handleBlur}  />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                      <InputGroup className="mb-2">
                        <InputGroup.Prepend className="registration-card__prepend">
                          <KeyFill />
                        </InputGroup.Prepend>
                        <Form.Control 
                          isInvalid={touched.password && !!errors.password} 
                          name="password" autoComplete="new-password" 
                          type="password" placeholder="password" 
                          value={values.password} 
                          onChange={handleChange} 
                          onBlur={handleBlur} />
                        <Form.Control.Feedback type="invalid">
                          {errors.password}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>

                    <Form.Group controlId="formPasswordConfirmation">
                      <InputGroup className="mb-2">
                        <InputGroup.Prepend className="registration-card__prepend">
                          <KeyFill />
                        </InputGroup.Prepend>
                        <Form.Control 
                          isInvalid={touched.passwordConfirmation && !!errors.passwordConfirmation} 
                          name="passwordConfirmation" autoComplete="current-password" 
                          type="password" placeholder="Password Confirmation" 
                          value={values.passwordConfirmation} 
                          onChange={handleChange} 
                          onBlur={handleBlur} />
                        <Form.Control.Feedback type="invalid">
                          {errors.passwordConfirmation}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>

                    <Form.Group controlId="formBirthday">
                      <InputGroup>
                        <InputGroup.Prepend className="registration-card__prepend">
                          <Calendar2DateFill />
                        </InputGroup.Prepend>
                        <Form.Control 
                          isInvalid={touched.birthday && !!errors.birthday} 
                          name="birthday" type="date" placeholder="birthday" 
                          value={values.birthday} 
                          onChange={handleChange} 
                          onBlur={handleBlur} />
                        <Form.Control.Feedback type="invalid">
                          {errors.birthday}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>

                    {loading ? 
                    <Spinner className="float-right" animation="grow" variant="primary"/>
                    :
                    <Button className="float-right" variant="primary" type="submit" onClick={handleSubmit}>
                      SignUp
                    </Button>}
                  </Form>
                )}
            </Formik>
          </Card.Body>
          {!loading &&<Card.Footer>Do you have an account? <Link to='/'>Sign In</Link></Card.Footer>}
        </Card>
      </Col>
    </Row>
  );
}

export default RegistrationView