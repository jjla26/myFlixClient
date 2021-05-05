import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Row, Col, ListGroup, Button, Spinner, Alert, Form, InputGroup } from 'react-bootstrap'
import { PersonFill, KeyFill, Calendar2DateFill } from 'react-bootstrap-icons'
import { Formik } from 'formik'

import { setError, setMessage, setUserDetails, setUser } from '../../redux/actions/actions'
import useRequest from '../../hooks/useRequest' 
import Validation from '../../utils/registerValidation' 
import userlogo from 'url:../../img/user.svg' 
import Modal from '../modal/modal' 
import useLogOut from '../../hooks/useLogOut'
import './profile-view.scss'
import moment from 'moment'

function Profile(){
  const onLoggedOut = useLogOut()
  const dispatch = useDispatch()
  const apiRequest = useRequest()
  const [ loading, setLoading ] = useState(false)
  const [ showModal, setShowModal ] = useState(false) 
  const [ update, setUpdate ] = useState(false)
  const userDetails = useSelector(state => state.userDetails)

  const onDeleteAcc = async () => {
    setLoading(true)
    try {
      await apiRequest('DELETE', `/users/${userDetails.Username}`)
      setLoading(false)
      onLoggedOut()
    } catch (error) {
      setLoading(false)
      setShowModal(false)
      dispatch(setError(error))
    }
  }

  const handleSubmit = async (values) => {
    setLoading(true)
    try {
      const response = await apiRequest('PUT', `/users/${userDetails.Username}`, {
        ...(values.username ? { Username: values.username } : {}),
        ...(values.email ? { Email: values.email } : {}),
        ...(values.password ? { Password: values.password } : {}),
        ...(values.birthday ? { Birthday : values.birthday } : {}),
      })
      localStorage.setItem('user', response.data.Username);
      dispatch(setUser(response.data.Username))
      dispatch(setUserDetails(response.data))
      setLoading(false)
      setUpdate(false)
      dispatch(setMessage(response.message))
    } catch (error) {
      setLoading(false)
      dispatch(setError(error))
    }
  }

  return (
    <Row>

      <Col>
        <Row className="profile-view d-flex justify-content-center align-items-center">
          <Col md={4}>
            <Card className="profile-card text-center">
              <Card.Img variant="top" className="profile-card__image" src={userlogo} />
              {loading ? <Card.Body>
                <Spinner animation="grow" variant="primary"/>
              </Card.Body>
              :
              update ? 
              <Card.Body>
                <Button className="m-2" onClick={() => setUpdate(false)}>Cancel Update</Button>
              </Card.Body>
              :
              <Card.Body>
                <Button className="m-2" onClick={() => setUpdate(true)}>Update</Button>
                <Button variant="danger" className="m-2" onClick={() => setShowModal(true)}>Delete my account</Button>
              </Card.Body>}
            </Card>
          </Col>
          <Col md={8}>
            <Card className="profile-card">
              {update ?
                <Row className="d-flex justify-content-center align-items-center">
                  <Col md={8}>
                    <Formik
                      validate={Validation}
                      onSubmit={handleSubmit}
                      initialValues={{
                        username: userDetails.Username,
                        email: userDetails.Email,
                        password: '',
                        passwordConfirmation: '',
                        birthday: moment(userDetails.Birthday).format('YYYY-MM-DD'),
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
                              <InputGroup.Prepend className="update-card__prepend">
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
                              <InputGroup.Prepend className="update-card__prepend">
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
                              <InputGroup.Prepend className="update-card__prepend">
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
                              <InputGroup.Prepend className="update-card__prepend">
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
                              <InputGroup.Prepend className="update-card__prepend">
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
                            Update
                          </Button>}
                        </Form>
                      )}
                  </Formik>
                </Col>
              </Row>
              : 
                <ListGroup variant="flush">
                  <ListGroup.Item  className="profile-details">Username: {userDetails.Username}</ListGroup.Item>
                  <ListGroup.Item  className="profile-details">Email: {userDetails.Email}</ListGroup.Item>
                  <ListGroup.Item  className="profile-details">Birdthday: {moment(userDetails.Birthday).format('DD.MM.YYYY')}</ListGroup.Item>
                </ListGroup>
              }
            </Card>
          </Col>
          <Modal 
            title="Confirmation"
            body="Are you sure you want to delete your account?"
            button="Confirm"
            action={onDeleteAcc}
            handleClose={() => setShowModal(false)}
            show={showModal}
          />
        </Row>
      </Col>
    </Row>
  )
}

export default Profile
