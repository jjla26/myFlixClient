import React from 'react'
import PropTypes from 'prop-types';
import { Row, Col, Image, Button } from 'react-bootstrap'
import { usePalette } from 'react-palette'
import { Link } from 'react-router-dom'

import './movie-view.scss'

const styles = {
  movieView: (color) => ({
    backgroundImage: `linear-gradient(90deg, transparent, ${color}, transparent)`
  })
}

function MovieView(props){
  const { movie, onBackButton, favorite, onAddFavorite, onDeleteFavorite } = props
  const { data } = usePalette(movie.ImagePath)

  return (
    <Row className="movie-view">
      <Col md={4} className="d-flex justify-content-center align-items-center" style={styles.movieView(data.vibrant)}>
         <Image className="movie-view__image" src={movie.ImagePath} />
      </Col>
      <Col md={8} className="d-flex flex-column justify-content-center align-items-center">
        <Row p={5}>
          <Col className="m-2">
            Title: {movie.Title}
          </Col>
        </Row>
        <Row>
          <Col className="m-2">
            <span className="label">Genre: </span>
            <span className="value"><Link to={`/genre/${movie.Genre.Name}`}>{movie.Genre.Name}</Link></span>
          </Col>
        </Row>
        <Row>
          <Col className="m-2">
            <span className="label">Director: </span>
            <span className="value"><Link to={`/director/${movie.Director.Name}`}>{movie.Director.Name}</Link></span>
          </Col>
        </Row>
        <Row>
          <Col className="m-2">
            <span className="label">Description: </span>
            <span className="value">{movie.Description}</span>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button onClick={onBackButton} className="m-2">Back</Button>
            {favorite ? 
            <Button onClick={() => onDeleteFavorite(movie._id)} className="m-2">Delete From Favorites</Button>
            :
            <Button onClick={() => onAddFavorite(movie._id)} className="m-2">Add to Favorites</Button>
            }
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
