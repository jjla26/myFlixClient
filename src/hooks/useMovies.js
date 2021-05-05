import { useDispatch } from 'react-redux'

import { setMovies, setError } from '../redux/actions/actions'
import useRequest from './useRequest'

const useMovies = () => {
  const dispatch = useDispatch()
  const apiRequest = useRequest()
  
  const getMovies = async () => {
    try {
      const response = await apiRequest('GET', '/movies')
      dispatch(setMovies(response.data))
    } catch (error) {
      dispatch(setError(error))
    }
  }

  return getMovies
}

export default useMovies