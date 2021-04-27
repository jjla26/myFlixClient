import axios from 'axios'

import apiUrl from '../utils/api'

function useRequest() { 

  const apiRequest = async (method, path, data = null, headers = null) => {
    try {
      const response = await axios({method, url: `${apiUrl}${path}`, data, headers})
      return response.data
    } catch (error) {
      throw error.response.data.message ? error.response.data.message : "Ops! Something happened"
    }
  }

  return apiRequest
}

export default useRequest
