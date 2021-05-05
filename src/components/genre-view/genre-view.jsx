import React from 'react'
import { useSelector } from 'react-redux'
import { Row, Col, Button } from 'react-bootstrap'

import MovieList from '../movie-list/movie-list'
import './genre-view.scss'

function GenreView(props){
  const { match, history } = props
  const movies = useSelector(state => state.movies)
  const movie = movies.find(movie => movie.Genre.Name === match.params.name)

  return (
    <Col>
      <Row className="genre-view d-flex flex-column justify-content-center align-items-center">
        <Col md={10} className="d-flex flex-column justify-content-center align-items-center">
          <Row p={5}>
            <Col className="m-2">
              Name: {movie?.Genre.Name}
            </Col>
          </Row>
          <Row>
            <Col className="m-2">
              Description: {movie?.Genre.Description}
            </Col>
          </Row>
          <Row>
            <Col>
              <Button onClick={() => history.goBack()}>Back</Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center">
        <h4>{match.params.name} Movies</h4>
      </Row>
      <Row className="d-flex justify-content-center">
        <MovieList movies={movies.filter(movie => movie.Genre.Name === match.params.name)} />
      </Row>
    </Col>
  )
}

export default GenreView
