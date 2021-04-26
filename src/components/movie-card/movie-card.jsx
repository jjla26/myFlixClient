import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Card, Button, ListGroup } from 'react-bootstrap'

import './movie-card.scss'

class MovieCard extends Component {
  render() {
    const { movie, onMovieClick } = this.props  
    return (
      <Card className="movie-card" onClick={() => onMovieClick(movie)}>
        <Card.Img src={movie.ImagePath} />
        <Card.Body>
          <Card.Text>
            {movie.Title}
          </Card.Text>
        </Card.Body>
      </Card>
    )
  }
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }),
    ImagePath: PropTypes.string.isRequired 
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};

export default MovieCard;
