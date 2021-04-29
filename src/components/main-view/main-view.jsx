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
  const [ message, setMessage ] = useState(false)
  const [ movies, setMovies ] = useState([])
  const [ user, setUser ] = useState(null)
  const [ userDetails, setUserDetails ] = useState({})

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
  const onLoggedIn = authData => {
    setUser(authData.data.Username)
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.data.Username);
    getMovies();
    getUserDetails(authData.data.Username, authData.token)
    setMessage("You have logged in successfully")
  }

  const getMovies = async () => {
    try {
      const response = await apiRequest('GET', '/movies')
      setMovies(response.data)
    } catch (error) {
      setError(error)
    }
  }

  const getUserDetails = async (name) => {
    try {
      const response = await apiRequest('GET', `/users/${name}`)
      setUserDetails(response.data)
    } catch (error) {
      setError(error)
    }
  }

  const onLoggedOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setMessage("You have logged out successfully  ")
  }

  const onAddFavorite = async movie => {
    try {
      const response = await apiRequest('POST', `/users/${user}/favorites/${movie}`)
      setUserDetails(response.data)
      setMessage(response.message)
    } catch (error) {
      setError(error)
    }
  } 
  const onDeleteFavorite = async movie => {
    try {
      const response = await apiRequest('DELETE', `/users/${user}/favorites/${movie}`)
      setUserDetails(response.data)
      setMessage(response.message)
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
    if(message){
      setTimeout(() => setMessage(null), 3000)
    }
  },[message])

  useEffect(() => {
    const getData = async () => {
      const accessToken = localStorage.getItem('token');
      if (accessToken !== null) {
        setUser(localStorage.getItem('user'));
        getMovies();
        getUserDetails(localStorage.getItem('user'))
      }
    }
    getData()
  },[])

  let renderMovies
  if (movies.length === 0) renderMovies = <div className="main-view"></div>; // Rendering movies just if there are movies
  else renderMovies = movies.map(movie => 
    <Col className="content d-flex flex-column justify-content-center align-items-center" md={3} key={movie._id} >
      <MovieCard movie={movie} />
    </Col>
    )

  return (
    <Router>
      {user && <Navbar user={user} onLoggedOut={onLoggedOut}/>}
      <Row className="main-view d-flex justify-content-md-center">

        <Route exact={true} path="/" render={() => {
          if(!user) return <Col><LoginView onLoggedIn={user => onLoggedIn(user)} /></Col>
          if (movies.length === 0) return <div className="main-view" />;
          return renderMovies
        }}/>
        <Route path="/register" render={() => {
          if (user) return <Redirect to="/" />
          return (
            <Col>
              <RegistrationView setMessage={setMessage} />
            </Col>
          )
        }} />
        <Route path="/myfavorites" render={() => {
          if (movies.length === 0) return <div className="main-view" />;
          if(!user) return <Redirect to="/" />

          return (
            <Col>
              <Row className="d-flex justify-content-center">
                <h4>My List of Favorites Movies</h4>
              </Row>
              <Row>
                {userDetails.FavoriteMovies && userDetails.FavoriteMovies.length > 0 ? 
                movies.filter(movie => userDetails.FavoriteMovies && userDetails.FavoriteMovies.find(fav => fav === movie._id)).map(movie => 
                  <Col className="content d-flex flex-column justify-content-center align-items-center" md={3} key={movie._id} >
                    <MovieCard movie={movie} />
                  </Col>)
                : 
                <Col className="d-flex justify-content-center p-5">
                  <h6>Add movies to your favorites</h6>
                </Col>
                }
              </Row>
            </Col>
          )
        }} />
        <Route path="/profile" render={() => {
          if (movies.length === 0) return <div className="main-view" />;
          if(!user) return <Redirect to="/" />
          return (
            <Col>
              <ProfileView setUserDetails={setUserDetails} setUser={setUser} userDetails={userDetails} onLoggedOut={onLoggedOut}/>
            </Col>
          )
        }} />
        <Route path="/movies/:movieId" render={({ match, history }) => {
          if (movies.length === 0) return <div className="main-view" />;
          if(!user) return <Redirect to="/" />
          return (<Col>
            <MovieView 
              movie={movies.find(movie => movie._id === match.params.movieId)} 
              favorite={userDetails.FavoriteMovies && userDetails.FavoriteMovies.find(movie => movie === match.params.movieId )} 
              onAddFavorite={onAddFavorite}
              onDeleteFavorite={onDeleteFavorite}
              onBackButton={() => history.goBack()} />
          </Col>
          )
        }}/>
        <Route path="/director/:name" render={({ match, history }) => {
          if (movies.length === 0) return <div className="main-view" />;
          if(!user) return <Redirect to="/" />
          return (
            <Col>
              <DirectorView director={movies.find(movie => movie.Director.Name === match.params.name).Director}  onBackButton={() => history.goBack()} />
              <Row className="d-flex justify-content-center">
                <h4>{match.params.name}'s Movies</h4>
              </Row>
              <Row className="d-flex justify-content-center">
                {movies.filter(movie => movie.Director.Name === match.params.name).map(movie => 
                  <Col className="content d-flex flex-column justify-content-center align-items-center" md={3} key={movie._id} >
                    <MovieCard movie={movie} />
                  </Col>)
                }
              </Row>
            </Col>
          )
        }} />
        <Route path="/genre/:name" render={({ match, history }) => {
          if (movies.length === 0) return <div className="main-view" />;
          if(!user) return <Redirect to="/" />
          return (
            <Col>
              <GenreView genre={movies.find(movie => movie.Genre.Name === match.params.name).Genre} onBackButton={() => history.goBack()} />
              <Row className="d-flex justify-content-center">
                <h4>{match.params.name} Movies</h4>
              </Row>
              <Row className="d-flex justify-content-center">
                {movies.filter(movie => movie.Genre.Name === match.params.name).map(movie => 
                  <Col className="content d-flex flex-column justify-content-center align-items-center" md={3} key={movie._id} >
                    <MovieCard movie={movie} />
                  </Col>)
                }
              </Row>
            </Col>
          )
        }} />
      </Row>
      <Alert show={!!error} className="error-message" variant="secondary">{error}</Alert>
      <Alert show={!!message} className="success-message" variant="primary">{message}</Alert>
    </Router>
  );
};

export default MainView;