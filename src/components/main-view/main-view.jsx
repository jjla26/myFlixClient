import React, { Component } from 'react'
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap'

import LoginView from '../login-view/login-view';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import RegistrationView from '../registration-view/registration-view';

class MainView extends Component {
  constructor(){
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      register: false
    }
    this.setSelectedMovie = this.setSelectedMovie.bind(this);
  }

  componentDidMount(){
    axios.get('https://moviesapi-node.herokuapp.com/movies')
      .then(response => {
        this.setState({ movies: response.data.data})
      })
      .catch(error => {
        console.log(error)
      })
  }

  /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/
  setSelectedMovie(selectedMovie){
    this.setState({ selectedMovie })
  }

  setRegister(register){
    this.setState({ register })
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
  onLoggedIn(user) {
    axios.post('https://moviesapi-node.herokuapp.com/login', user)
    .then(response => {
      this.setState({ user: response.data.data})
    })
    .catch(error => {
      console.log(error)
    })
  }

  onSignUp(user) {
    axios.post('https://moviesapi-node.herokuapp.com/users', user)
    .then(response => {
      this.setState({ register: false })
    })
    .catch(error => {
      console.log(error)
    })
  }

  render() {
    const { user, movies, selectedMovie, register } = this.state;

    if(register) return <RegistrationView setRegister={register => this.setRegister(register)} onSignUp={user => this.onSignUp(user)} />
    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
    if (!user) return <LoginView setRegister={register => this.setRegister(register)} onLoggedIn={user => this.onLoggedIn(user)} />;

    if (movies.length === 0) return <div className="main-view"></div>; // Rendering string if movie array is empty
  
    return (
      <>
        {selectedMovie ? 
        <MovieView movie={selectedMovie} onBackButton={this.setSelectedMovie} />
        : 
        <Container>
          <Row xs={1} md={2} lg={4} noGutters>
            {movies.map(movie => 
            <Col className="d-flex justify-content-center" key={movie._id} >
              <MovieCard movie={movie} onMovieClick={this.setSelectedMovie} />
            </Col>
            )}
          </Row>
        </Container>
        }
      </>
    );
  }
};

export default MainView;