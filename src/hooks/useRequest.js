import axios from 'axios'

import apiUrl from '../utils/api'

function useRequest() { 

  const apiRequest = async (method, path, data = null, token) => {
    const accessToken = token ? token : localStorage.getItem('token')
    try {
      const response = await axios({
        method, 
        url: `${apiUrl}${path}`, 
        data, 
        headers: {
          Authorization: `Bearer ${accessToken}`
        }})
      return response.data
    } catch (error) {
      throw error.response ? error.response.data.message : "Ops! Something happened"
    }
  }

  return apiRequest
}

export default useRequest
