# Image Upload and CNN Kernel Processing Project

This project allows users to upload images, which are processed using Convolutional Neural Networks (CNNs) with various kernel methods. After processing, the user can view the processed images, details about the kernel methods applied, and even interact with a language model to get an explanation of the processed images.

## Project Structure

The project uses the MERN stack (MongoDB, Express, React, Node.js) along with Flask and TensorFlow for backend image processing.

### Key Features

1. **User Authentication**
   - Users can sign up and log in to the application. All user data is stored and managed using MongoDB.

2. **Image Upload**
   - Users can upload an image, which is then sent to a cloud service for storage.
   - Upon upload, the image URL is sent to a Flask API running on a GPU for further processing.

3. **CNN Image Processing**
   - Various kernel methods (such as Vertical Edge, Horizontal Edge, Sharpen, Smoothing, Gaussian Blur, Emboss) are applied to the uploaded image using CNN.
   - Users can select one or more kernels (up to 3 layers) to apply on the image.
   - The processed images are uploaded to the cloud service, and the URLs are saved in the database.

4. **Image Details View**
   - Users can click the "Details" button to view detailed information about the image, including which kernel(s) were applied, and the URLs of the processed images.

5. **One-Time Chat with LLM**
   - After selecting a kernel image, users can chat with a Language Model (LLM) for an explanation of the image, which provides insights into the kernel effect and image modifications.

6. **MongoDB Schema**
   - The MongoDB database stores image data along with details of the processed images (including the kernel applied, processed image URL, and number of layers applied).

### Backend Setup

1. **MongoDB**
   - MongoDB stores user data, uploaded images, and processed image details.

2. **Express Server**
   - The server handles image uploads, interacts with Flask API for image processing, and manages API requests.

3. **Flask API with TensorFlow**
   - The Flask API uses TensorFlow and Keras to apply various CNN kernels on images. It supports single and multiple layers of kernels and returns the processed images' URLs.

4. **Cloud Storage**
   - Images are uploaded to a cloud service (e.g., Cloudinary) for storage. The image URLs are then stored in the MongoDB database.

### How It Works

1. **Image Upload**
   - A user uploads an image via the frontend. The image is sent to the backend and uploaded to the cloud.
   - The image URL is then sent to a Flask API running on a GPU.

2. **CNN Kernel Processing**
   - The Flask API applies different convolutional kernels (e.g., Vertical Edge, Horizontal Edge) to the image.
   - Multiple layers of kernels can be applied sequentially to the image, and the processed image is returned.

3. **Processed Image Upload**
   - After the CNN processing, the processed images are uploaded to the cloud service.
   - URLs for each processed image are stored in the MongoDB database, along with details about the kernels applied.

4. **View Image Details**
   - Users can click the "Details" button to view the kernels applied to the image, along with links to the processed images.

5. **LLM Chat for Image Explanation**
   - Users can choose a processed image and start a one-time chat with a language model to get an explanation of what the image represents and how the kernel has modified the image.

### MongoDB Schema

The MongoDB schema for storing file and image processing data looks like this:

```js
const fileDataSchema = new Schema(
  {
    fileUrl: { type: String, required: true },  // URL of the uploaded image on Cloudinary
    fileName: { type: String },  // The original file name
    processedImages: [{         // Array to store processed image details
      kernelName: { type: String, required: true },
      image: { type: String, required: true }, // URL of the processed image
      isMultipleLayers: { type: Boolean, required: true }, // Indicates if multiple layers were used
      layersApplied: { type: Number, required: true } // Number of layers applied
    }],
  },
  { timestamps: true }
);
```





### How to Run the Project>>>>>>

Follow the steps below to run the project locally:

#### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone <repo-url>
```

#### 2. Set Up the Backend Server

- Navigate to the `server` directory:

```bash
cd server
```

- Install the required dependencies:

```bash
npm install
```

#### 3. Set Up the Frontend

- Navigate to the `frontend` directory:

```bash
cd ../frontend
```

- Install the required dependencies:

```bash
npm install
```

#### 4. Set Up the Notebook (For Image Processing)

- Download the notebook from the repository.

- Upload the notebook to [Kaggle](https://www.kaggle.com/) or [Google Colab](https://colab.research.google.com/).

- Run the first cell to install the necessary libraries.

- In the second cell, enter the API keys for ngrok and the cloud service.

- Run the third cell to start the ngrok tunnel. Copy the ngrok URL that is generated.

#### 5. Configure the Server with ngrok URL

- In the `server` directory, open the `.env` file.

- Paste the ngrok URL you copied from the notebook into the appropriate field in the `.env` file.

- **Note**: Restart the server whenever changes are made to the `.env` file.

#### 6. Run the Backend Server

- Start the backend server:

```bash
npm run dev
```

#### 7. Run the Frontend

- Go back to the `frontend` directory and run:

```bash
npm run dev
```

#### 8. Access the Application

- Open your browser and visit `http://localhost:3000` to access the frontend.

- The backend server will run on its respective localhost URL and will handle image processing and other operations.

### Notes:
- The server needs to be restarted whenever changes are made in the `.env` file to update the environment variables.
- Ensure the ngrok URL is live while the server is running for proper API communication.

Now you can use the website and perform all actions related to image uploading, kernel processing, and interacting with the LLM for explanations!
