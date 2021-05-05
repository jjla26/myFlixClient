import React, { useEffect } from 'react'
import { Alert } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

import { setUser, setMessage, setError } from '../../redux/actions/actions'
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
import useUserDetails from '../../hooks/useUserDetails';
import useMovies from '../../hooks/useMovies';
import './main-view.scss'

function MainView(){
  const dispatch = useDispatch()
  const getUserDetails = useUserDetails()
  const getMovies = useMovies()
  const message = useSelector(state => state.message)
  const error = useSelector(state => state.error)
  const user = useSelector(state => state.user)

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
      {user && <Navbar />}
      <Route path="/myfavorites" component={FavoritesView} />          
      <Route path="/movies/:movieId" component={MovieView} />          
      <Route path="/director/:name" component={DirectorView} />
      <Route path="/genre/:name" component={GenreView} />
      <Route path="/profile" component={ProfileView} /> 
      <Route path="/register" component={RegistrationView} />
      <Route exact={true} path="/" component={user ? MovieList : LoginView} />
      <Route exact={true} path="/" component={user ? MovieList : LoginView} />
      <Redirect to="/" />
      <Alert show={!!error} className="error-message" variant="secondary">{error}</Alert>
      <Alert show={!!message} className="success-message" variant="primary">{message}</Alert>
      <Footer />
    </Router>
  );
};

export default MainView;