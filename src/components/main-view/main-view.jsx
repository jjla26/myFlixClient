import React, { useEffect } from 'react'
import { Row, Col, Alert } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

import { setMovies, setUser, setUserDetails, setMessage, setError } from '../../redux/actions/actions'
import Navbar from '../navigation/navigation';
import Footer from '../footer/footer';
import LoginView from '../login-view/login-view';
import MovieList from '../movie-list/movie-list';
import DirectorView from '../director-view/director-view';
import GenreView from '../genre-view/genre-view';
import MovieView from '../movie-view/movie-view';
import ProfileView from '../profile-view/profile-view';
import RegistrationView from '../registration-view/registration-view';
import useRequest from '../../hooks/useRequest'
import './main-view.scss'

function MainView(){
  const dispatch = useDispatch()
  const apiRequest = useRequest()
  const movies = useSelector(state => state.movies)
  const message = useSelector(state => state.message)
  const error = useSelector(state => state.error)
  const user = useSelector(state => state.user)
  const userDetails = useSelector(state => state.userDetails)



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

  const onLoggedOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(setUser(null));
    dispatch(setMessage("You have logged out successfully  "))
  }

  const onAddFavorite = async movie => {
    try {
      const response = await apiRequest('POST', `/users/${user}/favorites/${movie}`)
      dispatch(setUserDetails(response.data));
      dispatch(setMessage(response.message))
    } catch (error) {
      setError(error)
    }
  } 
  const onDeleteFavorite = async movie => {
    try {
      const response = await apiRequest('DELETE', `/users/${user}/favorites/${movie}`)
      dispatch(setUserDetails(response.data))
      dispatch(setMessage(response.message))
    } catch (error) {
      dispatch(setError(error))
    }
  }

  useEffect(() => {
    let timeout
    if(error){
      timeout = setTimeout(() => dispatch(setError(null)), 3000)
    }
    return () => {
      clearTimeout(timeout)
    }
  },[error])

  useEffect(() => {
    let timeout
    if(message){
      timeout = setTimeout(() => dispatch(setMessage(null)), 3000)
    }
    return () => {
      clearTimeout(timeout)
    }
  },[message])

  useEffect(() => {
    const getData = async () => {
      const accessToken = localStorage.getItem('token');
      if (accessToken !== null) {
        dispatch(setUser(localStorage.getItem('user')));
        getMovies();
        getUserDetails(localStorage.getItem('user'))
      }
    }
    getData()
  },[])

  return (
    <Router>
      {user && <Navbar user={user} onLoggedOut={onLoggedOut}/>}
      <Row className="main-view d-flex justify-content-md-center">
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
                <MovieList movies={movies.filter(movie => userDetails.FavoriteMovies && userDetails.FavoriteMovies.find(fav => fav === movie._id))} />
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
              <ProfileView onLoggedOut={onLoggedOut}/>
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
        <Route path="/director/:name" component={DirectorView} />
        <Route path="/genre/:name" component={GenreView} />
        <Route path="/register" component={RegistrationView} />
        <Route exact={true} path="/" component={user ? MovieList : LoginView} />
      </Row>
      <Footer />
      <Alert show={!!error} className="error-message" variant="secondary">{error}</Alert>
      <Alert show={!!message} className="success-message" variant="primary">{message}</Alert>
    </Router>
  );
};

export default MainView;