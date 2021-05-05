import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Image, Button } from 'react-bootstrap'
import { usePalette } from 'react-palette'
import { Link } from 'react-router-dom'

import useRequest from '../../hooks/useRequest'
import { setUserDetails, setMessage, setError} from '../../redux/actions/actions'
import './movie-view.scss'

const styles = {
  movieView: (color) => ({
    backgroundImage: `linear-gradient(90deg, transparent, ${color}, transparent)`
  })
}

function MovieView(props){
  const apiRequest = useRequest()
  const dispatch = useDispatch()
  const { history, match } = props
  const movies = useSelector(state => state.movies)
  const userDetails = useSelector(state => state.userDetails)
  const user = useSelector(state => state.user)
  const movie = movies.length > 0 && movies.find(movie => movie._id === match.params.movieId)
  const favorite = userDetails.FavoriteMovies && userDetails.FavoriteMovies.find(movie => movie === match.params.movieId )
  const { data } = usePalette(movie.ImagePath)

  const onAddFavorite = async movie => {
    try {
      const response = await apiRequest('POST', `/users/${user}/favorites/${movie}`)
      dispatch(setUserDetails(response.data));
      dispatch(setMessage(response.message))
    } catch (error) {
      console.log(error)
      dispatch(setError(error))
    }
  } 
  
  const onDeleteFavorite = async movie => {
    try {
      const response = await apiRequest('DELETE', `/users/${user}/favorites/${movie}`)
      dispatch(setUserDetails(response.data))
      dispatch(setMessage(response.message))
    } catch (error) {
      console.log(error)
      dispatch(setError(error))
    }
  }

  return (
    <Row className="movie-view">
      <Col md={4} className="d-flex justify-content-center align-items-center" style={styles.movieView(data.vibrant)}>
         <Image className="movie-view__image" src={movie?.ImagePath} />
      </Col>
      <Col md={8} className="d-flex flex-column justify-content-center align-items-center">
        <Row p={5}>
          <Col className="m-2">
            Title: {movie?.Title}
          </Col>
        </Row>
        <Row>
          <Col className="m-2">
            <span className="label">Genre: </span>
            <span className="value"><Link to={`/genre/${movie?.Genre.Name}`}>{movie?.Genre.Name}</Link></span>
          </Col>
        </Row>
        <Row>
          <Col className="m-2">
            <span className="label">Director: </span>
            <span className="value"><Link to={`/director/${movie?.Director.Name}`}>{movie?.Director.Name}</Link></span>
          </Col>
        </Row>
        <Row>
          <Col className="m-2">
            <span className="label">Description: </span>
            <span className="value">{movie?.Description}</span>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button onClick={() => history.goBack()} className="m-2">Back</Button>
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

export default MovieView
