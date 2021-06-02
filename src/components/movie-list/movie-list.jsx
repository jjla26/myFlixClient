import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import MovieCard from '../movie-card/movie-card';
import './movie-list.scss'

const mapStateToProps = state => {
  const { visibilityFilter, movies } = state;
  return { visibilityFilter, movies};
};

function MoviesList(props) {
  const { visibilityFilter, movies } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

 return (
   <Row>
    <Col className="movie-list">
      <Row className="d-flex justify-content-center align-items-center">
        {filteredMovies.map(m => (
          <Col className="d-flex justify-content-center align-items-center" md={3} key={m._id}>
            <MovieCard movie={m} />
          </Col>))}
      </Row>
    </Col>
   </Row>
 )
}

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
  visibilityFilter: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(MoviesList);