import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Row, Col, Image, Button } from 'react-bootstrap'
import { usePalette } from 'react-palette'

import './movie-view.scss'

const styles = {
  movieView: (color) => ({
    backgroundImage: `linear-gradient(170deg, ${color}, transparent)`
  })
}

function MovieView(props){
  const { movie, onBackButton } = props
  const { data, loading, error } = usePalette(movie.ImagePath)

  return (
    <Row className="movie-view" style={styles.movieView(data.vibrant)}>
      <Col md={4} className="d-flex justify-content-center align-items-start">
         <Image className="movie-view__image" src={movie.ImagePath} />
      </Col>
      <Col md={8} className="d-flex flex-column justify-content-start">
        <Row>
          <Col>
            Title: {movie.Title}
          </Col>
        </Row>
        <Row>
          <Col>
            <span className="label">Description: </span>
            <span className="value">{movie.Description}</span>
          </Col>
        </Row>
        <Row>
          <Col>
            <span className="label">Genre: </span>
            <span className="value">{movie.Genre?.Name}</span>
          </Col>
        </Row>
        <Row>
          <Col>
            <span className="label">Director: </span>
            <span className="value">{movie.Director?.Name}</span>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button onClick={() => onBackButton(null)}>Back</Button>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }),
    ImagePath: PropTypes.string.isRequired 
  }).isRequired,  
  onBackButton: PropTypes.func.isRequired
}

export default MovieView
