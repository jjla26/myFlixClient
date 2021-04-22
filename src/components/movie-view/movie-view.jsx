import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Container, Image, Row, Button } from 'react-bootstrap'
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
    <Container fluid className="movie-view" style={styles.movieView(data.vibrant)}>
      <Row className="justify-content-center">
        <Image className="movie-view__image" src={movie.ImagePath} />
      </Row>
      <Row className="justify-content-center">
        <span className="label">Title: </span>
        <span className="value">{movie.Title}</span>
      </Row>
      <Row className="justify-content-center">
        <span className="label">Description: </span>
        <span className="value">{movie.Description}</span>
      </Row>
      <Row className="justify-content-center">
        <span className="label">Genre: </span>
        <span className="value">{movie.Genre?.Name}</span>
      </Row>
      <Row className="justify-content-center">
        <span className="label">Director: </span>
        <span className="value">{movie.Director?.Name}</span>
      </Row>
      <Row className="justify-content-center">
        <Button onClick={() => onBackButton(null)}>Back</Button>
      </Row>
      </Container>
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
