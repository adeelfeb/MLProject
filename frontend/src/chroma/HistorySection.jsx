import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCurrentImageDetails, setCurrentFileData } from '../store/fileSlice';
import getUserData from '../AserverAuth/getUserData';

function HistorySection({ uploadedFiles }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loadingFileId, setLoadingFileId] = useState(null); // Track loading state for individual files

  // Function to truncate long filenames
  const truncateFileName = (fileName, length = 20) => {
    return fileName.length > length ? fileName.slice(0, length) + '...' : fileName;
  };

  const handleDetailsClick = async (file) => {
    try {
      // Fetch the image details (array of video details)
      const imageDetails = await getUserData.getImageDetails(file._id);
      console.log(imageDetails);
      
      // Dispatch the current file data
      dispatch(setCurrentFileData({ fileName: file.fileName, fileUrl: file.fileUrl }));
      
      // Dispatch the video details (setCurrentVideoDetails)
      dispatch(setCurrentImageDetails(imageDetails));
  
      // Navigate to the details page
      navigate(`/dashboard/info`); // Navigate to the details page
    } catch (error) {
      console.error("Error fetching image details:", error);
    }
  };
  

  return (
    <div className="flex-1 overflow-y-auto p-6">
      {uploadedFiles && uploadedFiles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 overflow-y-auto">
          {uploadedFiles
          .slice() // Create a shallow copy to avoid mutating the original array
          .reverse().
          map((file, index) => (
            <div
              key={index}
              className="p-4 border rounded-md shadow-sm bg-gray-100 flex flex-col justify-between items-center" // Add 'items-center' to center-align content
            >
              <div className="relative">
                <div className="inset-0 flex justify-center items-center">
                  {/* Image preview */}
                  <img
                    src={file.fileUrl}  // URL of the uploaded image
                    alt="File Preview"
                    className="w-32 h-32 object-cover " // Maintain the shape and size
                  />
                </div>
              </div>
              <div className="mt-2 text-center"> {/* Added 'text-center' to center-align text */}
                <p className="text-gray-500 text-sm">Title: {truncateFileName(file.fileName)}</p>
                <p className="text-gray-500 text-sm">
                  Upload Time: {new Date(file.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="mt-4 flex gap-2 justify-center"> {/* Added 'justify-center' to center the buttons */}
                <button
                  className={`${
                    loadingFileId === file._id
                      ? 'bg-gray-500'
                      : 'bg-blue-500'
                  } text-white py-1 px-4 rounded-md`}
                  onClick={() => handleDetailsClick(file)}
                  disabled={loadingFileId === file._id}
                >
                  Details
                </button>
                <button
                  className="bg-green-500 text-white py-1 px-4 rounded-md"
                  onClick={() => window.open(file.fileUrl, '_blank')}
                >
                  Open
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No files uploaded yet.</p> 
      )}
    </div>
  );

}

export default HistorySection;
