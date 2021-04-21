import React, { Component } from 'react'
import axios from 'axios';

import LoginView from '../login-view/login-view';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';

class MainView extends Component {
  constructor(){
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null
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

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  render() {
    const { user, movies, selectedMovie } = this.state;

    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    if (movies.length === 0) return <div className="main-view"></div>; // Rendering string if movie array is empty
  
    return (
      <div className="main-view">
        {selectedMovie ? 
        <MovieView movie={selectedMovie} onBackButton={this.setSelectedMovie} />
        : 
        movies.map(movie => <MovieCard key={movie._id} movie={movie} onMovieClick={this.setSelectedMovie} />)
        }
      </div>
    );
  }
};

export default MainView;