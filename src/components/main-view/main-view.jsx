import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap'

import Navbar from '../navigation/navigation';
import LoginView from '../login-view/login-view';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import RegistrationView from '../registration-view/registration-view';
import useRequest from '../../hooks/useRequest'
import './main-view.scss'

function MainView(){
  const apiRequest = useRequest()
  const [ error, setError ] = useState(false)
  const [ movies, setMovies ] = useState([])
  const [ selectedMovie, setSelectedMovie ] = useState(null)
  const [ user, setUser ] = useState(null)
  const [ register, setRegister ] = useState(false)

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
  const onLoggedIn = user => {
    setUser(user)
  }

  const onSignUp = () => {
    setRegister(false)
  }

  useEffect(() => {
    if(error){
      setTimeout(() => setError(null), 3000)
    }
  },[error])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiRequest('GET', '/movies')
        setMovies(response)
      } catch (error) {
        setError(error)
      }
    }
    fetchData()
  },[])

  if(register) return <RegistrationView setRegister={register => setRegister(register)} onSignUp={user => onSignUp(user)} />
  /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
  if (!user) return <LoginView setRegister={register => setRegister(register)} onLoggedIn={user => onLoggedIn(user)} />;

  let renderMovies
  if (movies.length === 0) renderMovies = <div className="main-view"></div>; // Rendering movies just if there are movies
  else renderMovies = movies.map(movie => 
    <Col className="content d-flex flex-column justify-content-center align-items-center" md={3} key={movie._id} >
      <MovieCard movie={movie} onMovieClick={movie => setSelectedMovie(movie)} />
    </Col>
    )

  return (
    <>
      <Navbar user={user}/>
      <Row className="main-view d-flex justify-content-md-center">
          {selectedMovie ?
            <Col>
              <MovieView movie={selectedMovie} onBackButton={movie => setSelectedMovie(movie)} />
            </Col>
          : 
            renderMovies
          }
      </Row>
      <Alert show={!!error} className="error-message" variant="primary">{error}</Alert>
    </>
  );
};

export default MainView;