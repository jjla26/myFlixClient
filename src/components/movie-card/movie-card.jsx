import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

import './movie-card.scss'

function MovieCard(props){
  const history = useHistory()
  const { movie } = props  
  return (
    <Card className="movie-card" onClick={() => history.push(`/movies/${movie._id}`)}>
      <Card.Img src={movie.ImagePath} />
      <Card.Body>
        <Card.Text>
          {movie.Title}
        </Card.Text>
      </Card.Body>
    </Card>
  )
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }),
    ImagePath: PropTypes.string.isRequired 
  }).isRequired,
};

export default MovieCard;
