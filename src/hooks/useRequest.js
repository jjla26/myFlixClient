import axios from 'axios'

import apiUrl from '../utils/api'

function useRequest() { 

  const apiRequest = async (method, path, data = null) => {
    try {
      const response = await axios({method, url: `${apiUrl}${path}`, data})
      return response.data.data
    } catch (error) {
      throw error
    }
  }

  return apiRequest
}

export default useRequest
