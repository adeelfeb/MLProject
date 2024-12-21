import axios from 'axios';
import conf from '../conf/conf.js'; // Configuration file for the API URL

class UploadService {
    constructor() {
        this.apiUrl = conf.apiUrl; // API base URL from the configuration (e.g., `http://localhost:8000/api/v1`)
    }

    async uploadImage(file, layers) {
        try {
          const accessToken = localStorage.getItem('accessToken');
          if (!accessToken) {
            console.log('No access token found in localStorage');
            return null;
          }

          const formData = new FormData();
          formData.append('file', file);  // Append the file to the FormData
          formData.append('layers', layers);  // Append the layers value to the FormData

          const response = await axios.post(`${this.apiUrl}/users/upload-file`, formData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'multipart/form-data',  // Ensures the request is sent with the proper content type
            },
            withCredentials: false, // You can set this to `true` if cookies should be sent with the request
          });

          return response.data;  // Return the data from the response
        } catch (error) {
          console.error('Error updating image:', error);
          // Fallback error message if no response data is available
          const errorMessage = error.response ? error.response.data.message : error.message || 'An unknown error occurred';
          throw new Error(errorMessage);
        }
    }
}

const uploadService = new UploadService();
export default uploadService;
