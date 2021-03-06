import React from 'react'
import { useSelector } from 'react-redux'
import { Row, Col, Button} from 'react-bootstrap'

import MovieCard from '../movie-card/movie-card'
import './director-view.scss'
import moment from 'moment'

function DirectorView(props){
  const { match, history } = props
  const movies = useSelector(state => state.movies)
  const movie = movies.find(movie => movie.Director.Name === match.params.name)
  
  return (
    <Row>

      <Col>
        <Row className="director-view d-flex flex-column justify-content-center align-items-center">
          <Col md={10} className="d-flex flex-column justify-content-center align-items-center">
            <Row p={5}>
              <Col className="m-2">
                Name: {movie?.Director.Name}
              </Col>
            </Row>
            <Row>
              <Col className="m-2">
                Birthdate: {moment(movie?.Director.Birth).format('DD-MM-YYYY')}
              </Col>
            </Row>
            <Row>
              <Col className="m-2">
                Description: {movie?.Director.Bio}
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
          <h4>{match.params.name}'s Movies</h4>
        </Row>
        <Row className="director-movies d-flex justify-content-center">
          {movies.filter(movie => movie.Director.Name === match.params.name).map(movie => 
            <Col className="d-flex justify-content-center align-items-center" md={3} key={movie._id} >
              <MovieCard movie={movie} />
            </Col>
          )}
        </Row>
      </Col>
    </Row>
  )
}

export default DirectorView
