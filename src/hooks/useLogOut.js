import { useDispatch } from 'react-redux'

import { setUser, setMessage } from '../redux/actions/actions'

const useLogOut = () => {
  const dispatch = useDispatch()
  
  const onLoggedOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(setUser(null));
    dispatch(setMessage("You have logged out successfully  "))
  }

  return onLoggedOut
}

export default useLogOut