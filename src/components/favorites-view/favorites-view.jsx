import React from 'react'
import { useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'

import MovieList from '../movie-list/movie-list'

function FavoritesView() {
  const movies = useSelector(state => state.movies)
  const userDetails = useSelector(state => state.userDetails)
  
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
}

export default FavoritesView
