import React, { useState, useEffect } from 'react'
import { Row, Col, Alert } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import Navbar from '../navigation/navigation';
import LoginView from '../login-view/login-view';
import MovieCard from '../movie-card/movie-card';
import DirectorView from '../director-view/director-view';
import GenreView from '../genre-view/genre-view';
import MovieView from '../movie-view/movie-view';
import ProfileView from '../profile-view/profile-view';
import RegistrationView from '../registration-view/registration-view';
import useRequest from '../../hooks/useRequest'
import './main-view.scss'

function MainView(){
  const apiRequest = useRequest()
  const [ error, setError ] = useState(false)
  const [ movies, setMovies ] = useState([])
  const [ selectedMovie, setSelectedMovie ] = useState(null)
  const [ user, setUser ] = useState(null)

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
  const onLoggedIn = authData => {
    setUser(authData.data)
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', JSON.stringify(authData.data));
    getMovies(authData.token);
  }

  const getMovies = async (token) => {
    try {
      const response = await apiRequest('GET', '/movies', null, token)
      setMovies(response.data)
    } catch (error) {
      setError(error)
    }
  }

  useEffect(() => {
    if(error){
      setTimeout(() => setError(null), 3000)
    }
  },[error])

  useEffect(() => {
    const getData = async () => {
      const accessToken = localStorage.getItem('token');
      if (accessToken !== null) {
        setUser(JSON.parse(localStorage.getItem('user')));
        getMovies(accessToken);
      }
    }
    getData()
  },[])

  let renderMovies
  if (movies.length === 0) renderMovies = <div className="main-view"></div>; // Rendering movies just if there are movies
  else renderMovies = movies.map(movie => 
    <Col className="content d-flex flex-column justify-content-center align-items-center" md={3} key={movie._id} >
      <MovieCard movie={movie} onMovieClick={movie => setSelectedMovie(movie)} />
    </Col>
    )

  return (
    <Router>
      {user && <Navbar user={user}/>}
      <Row className="main-view d-flex justify-content-md-center">

        <Route exact={true} path="/" render={() => {
          if(!user) return <Col><LoginView onLoggedIn={user => onLoggedIn(user)} /></Col>
          return renderMovies
        }}/>
        <Route path="/register" render={() => {
          if (user) return <Redirect to="/" />
          return (
            <Col>
              <RegistrationView />
            </Col>
          )
        }} />
        <Route path="/profile" render={() => {
          if(!user) return <Redirect to="/" />
          return (
            <Col>
              <ProfileView />
            </Col>
          )
        }} />
        <Route path="/movies/:movieId" render={() => {
          if(!user) return <Redirect to="/" />
          return (<Col>
            <MovieView movie={selectedMovie} onBackButton={movie => setSelectedMovie(movie)} />
          </Col>
          )
        }}/>
        <Route path="/director/:name" render={() => {
          if(!user) return <Redirect to="/" />
          return (
            <Col>
              <DirectorView />
            </Col>
          )
        }} />
        <Route path="/genre/:name" render={() => {
          if(!user) return <Redirect to="/" />
          return (
            <Col>
              <GenreView />
            </Col>
          )
        }} />
      </Row>
      <Alert show={!!error} className="error-message" variant="primary">{error}</Alert>
    </Router>
  );
};

export default MainView;