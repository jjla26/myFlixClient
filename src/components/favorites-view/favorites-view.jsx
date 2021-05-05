import React from 'react'
import { useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'

import MovieCard from '../movie-card/movie-card'
import './favorites-view.scss'

function FavoritesView() {
  const movies = useSelector(state => state.movies)
  const userDetails = useSelector(state => state.userDetails)
  
  return (
    <Row>
      <Col>
        <Row className="d-flex justify-content-center">
          <h4>My List of Favorites Movies</h4>
        </Row>
        <Row className="favorites-movies d-flex justify-content-center">
          {userDetails.FavoriteMovies && userDetails.FavoriteMovies.length > 0 ? 
          movies.filter(movie => userDetails.FavoriteMovies && userDetails.FavoriteMovies.find(fav => fav === movie._id)).map( 
            movie => <Col className="d-flex justify-content-center align-items-center" md={3} key={movie._id}>
              <MovieCard movie={movie} />
            </Col>)
          : 
          <Col className="d-flex justify-content-center p-5">
            <h6>Add movies to your favorites</h6>
          </Col>
          }
        </Row>
      </Col>
    </Row>
  )
}

export default FavoritesView
