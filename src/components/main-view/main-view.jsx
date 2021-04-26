import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Container, Row, Col, Spinner } from 'react-bootstrap'

import Navbar from '../navigation/navigation';
import LoginView from '../login-view/login-view';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import RegistrationView from '../registration-view/registration-view';
import useRequest from '../../hooks/useRequest'
import './main-view.scss'

function MainView(){
  const apiRequest = useRequest()
  const [ loading, setLoading ] = useState(false)
  const [ error, setError ] = useState(false)
  const [ movies, setMovies ] = useState([])
  const [ selectedMovie, setSelectedMovie ] = useState(null)
  const [ user, setUser ] = useState(null)
  const [ register, setRegister ] = useState(false)

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
  const onLoggedIn = async user => {
    setLoading(true)
    try {
      const response = await apiRequest('POST', '/login', user) 
      setLoading(false)
      setUser(response)
    } catch (error) {
      setLoading(false)
    }
  }

  const onSignUp = async user => {
    setLoading(true)
    try {
      await apiRequest('POST', '/users', user)
      setLoading(false)
      setRegister(false)
    } catch (error) {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiRequest('GET', '/movies')
        setMovies(response)
      } catch (error) {
      }
    }
    fetchData()
  },[])

  if(register) return <RegistrationView loading={loading} setRegister={register => setRegister(register)} onSignUp={user => onSignUp(user)} />
  /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
  if (!user) return <LoginView loading={loading} setRegister={register => setRegister(register)} onLoggedIn={user => onLoggedIn(user)} />;

  if (movies.length === 0) return <div className="main-view"></div>; // Rendering string if movie array is empty

  return (
    <>
      <Navbar user={user}/>
      <Row className="main-view d-flex justify-content-md-center">
          {selectedMovie ?
            <Col>
              <MovieView movie={selectedMovie} onBackButton={movie => setSelectedMovie(movie)} />
            </Col>
          : 
            movies.map(movie => 
            <Col className="d-flex flex-column justify-content-center align-items-center" md={3} key={movie._id} >
              <MovieCard movie={movie} onMovieClick={movie => setSelectedMovie(movie)} />
            </Col>
            )
          }
      </Row>
    </>
  );
};

export default MainView;