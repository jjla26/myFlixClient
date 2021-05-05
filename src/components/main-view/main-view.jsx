import React, { useEffect } from 'react'
import { Row, Alert } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from "react-router-dom";
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
import FavoritesView from '../favorites-view/favorites-view';
import useRequest from '../../hooks/useRequest'
import './main-view.scss'

function MainView(){
  const dispatch = useDispatch()
  const apiRequest = useRequest()
  const message = useSelector(state => state.message)
  const error = useSelector(state => state.error)
  const user = useSelector(state => state.user)

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
      <Row className="main-view">
        {user && <Navbar />}
      </Row>
      <Row className="main-view d-flex justify-content-md-center">
        <Route path="/myfavorites" component={FavoritesView} />          
        <Route path="/movies/:movieId" component={MovieView} />          
        <Route path="/director/:name" component={DirectorView} />
        <Route path="/genre/:name" component={GenreView} />
        <Route path="/profile" component={ProfileView} /> 
        <Route path="/register" component={RegistrationView} />
        <Route exact={true} path="/" component={user ? MovieList : LoginView} />
        <Alert show={!!error} className="error-message" variant="secondary">{error}</Alert>
        <Alert show={!!message} className="success-message" variant="primary">{message}</Alert>
      </Row>
      <Footer />
    </Router>
  );
};

export default MainView;