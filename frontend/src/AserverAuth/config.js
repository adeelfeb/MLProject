import axios from 'axios';
import conf from '../conf/conf.js'; // Configuration file for the API URL
import Cookies from 'js-cookie';

class VideoService {
    constructor() {
        this.apiUrl = conf.apiUrl; // API base URL from the configuration (e.g., `http://localhost:8000/api/v1`)
    }

       
      async getCurrentUser() {
        try {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) return null;

            const response = await axios.post(
                `${this.apiUrl}/users/current-user`, 
                {},
                { headers: { "Authorization": `Bearer ${accessToken}` }, withCredentials: false }
            );
            console.log("Inside the current user:", response.data.data)
            return response.data.data;
        } catch (error) {
            console.error("Error fetching current user:", error);
            return null;
        }
    }


      async getUserHistory() {
        try {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                console.error('No access token found in localStorage');
                return { status: 401, message: 'Unauthorized: No access token found', success: false };
            }
    
            const response = await axios.get(
                `${this.apiUrl}/users/history`, // API endpoint for getting the history
                {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`, // Attach the access token in the Authorization header
                    },
                    withCredentials: false, // No need to send cookies with this request
                }
            );
    
            console.log('Server Response:', response.data); // Log response for debugging
            return response.data; // Return the full response
        } catch (error) {
            console.error('Error fetching user history:', error);
    
            if (error.response) {
                const { status, data } = error.response;
                console.log('Server Error Response:', data); // Log server response
    
                return {
                    status: data.statusCode || status,
                    message: data.message || data.messsage || 'An unexpected error occurred',
                    success: data.success || false,
                };
            } else {
                console.error('Unknown Error:', error.message);
                return { status: 500, message: error.message || 'An unknown error occurred', success: false };
            }
        }
    }
    

    async changeCurrentPassword(oldPassword, newPassword) {
        try {
            console.log("Passwords", oldPassword, newPassword)
          const accessToken = localStorage.getItem('accessToken');
          if (!accessToken) {
            console.log('No access token found in localStorage');
            return null;
          }
    
          const response = await axios.patch(
            `${this.apiUrl}/users/change-password`,
            { oldPassword, newPassword },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
              withCredentials: false,
            }
          );
    
          return response.data;
        } catch (error) {
          console.error('Error changing password:', error);
          throw new Error(error.response ? error.response.data.message : error.message);
        }
      }
    
      async updateAccountDetails(fullname, email) {
        try {
          const accessToken = localStorage.getItem('accessToken');
          if (!accessToken) {
            console.log('No access token found in localStorage');
            return null;
          }
      
          const response = await axios.patch(
            `${this.apiUrl}/users/update-account`,
            { fullname, email },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
              withCredentials: false,
            }
          );
      
          return response.data;
        } catch (error) {
          console.error('Error updating account details:', error);
          // Throwing a custom error message based on the server response
          const errorMessage = error.response
            ? error.response.data.message
            : error.message;
      
          throw new Error(errorMessage);
        }
      }
      
    
      async updateUserAvatar(file) {
        try {
          const accessToken = localStorage.getItem('accessToken');
          if (!accessToken) {
            console.log('No access token found in localStorage');
            return null;
          }
    
          const formData = new FormData();
          formData.append('avatar', file);
    
          const response = await axios.patch(`${this.apiUrl}/users/update-avatar`, formData, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'multipart/form-data',
            },
            withCredentials: false,
          });
    
          return response.data;
        } catch (error) {
          console.error('Error updating avatar:', error);
          throw new Error(error.response ? error.response.data.message : error.message);
        }
      
      
      
      
      }
     
    



    
    
}

const videoService = new VideoService();
export default videoService;


