import { useDispatch } from 'react-redux'

import { setUserDetails, setError, setUser } from '../redux/actions/actions'
import useRequest from './useRequest'

const useUserDetails = () => {
  const dispatch = useDispatch()
  const apiRequest = useRequest()
  
  const getUserDetails = async (name) => {
    try {
      const response = await apiRequest('GET', `/users/${name}`)
      dispatch(setUserDetails(response.data))
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      dispatch(setUser(null));
      dispatch(setError(error))
    }
  }

  return getUserDetails
}

export default useUserDetails