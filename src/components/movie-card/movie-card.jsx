import React, { Component } from 'react'
import { Card, Button, ListGroup } from 'react-bootstrap'

import './movie-card.scss'

class MovieCard extends Component {
  render() {
    const { movie, onMovieClick } = this.props  
    return (
      <Card className="movie-card" onClick={() => onMovieClick(movie)}>
        <Card.Body>
          <Card.Text>
            {movie.Title}
          </Card.Text>
        </Card.Body>
        <Card.Img src={movie.ImagePath} />
        <Card.Body>
          <Card.Text>
            Genre: {movie.Genre ? movie.Genre.Name : ""}
          </Card.Text>
        </Card.Body>
      </Card>
    )
  }
};

export default MovieCard;
