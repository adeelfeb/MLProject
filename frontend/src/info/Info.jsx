import React from 'react';
import { Header } from '../components';
import { useSelector } from 'react-redux';

function Info() {
  const { currentFileData, currentImageDetails } = useSelector((state) => state.file);

  // Function to handle the image click (opens the image URL in a new tab)
  const handleImageClick = (imageUrl) => {
    window.open(imageUrl, '_blank');
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold p-4 rounded-lg text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-4 tracking-wide shadow-lg hover:underline hover:text-blue-600 cursor-pointer">
  Image and Kernel Details
</h1>

        <div className="mb-6">
          {/* Display the current file image URL at the top center */}
          {currentFileData.fileUrl && (
            <img
              src={currentFileData.fileUrl}
              alt={currentFileData.fileName}
              className="w-72 h-72 object-cover rounded-full border-4 border-gray-300 shadow-lg"
              onClick={() => handleImageClick(currentFileData.fileUrl)} // Handle image click
            />
          )}
        </div>

        {/* Display the current image details (kernels) */}
        {currentImageDetails.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {currentImageDetails.map((kernel, index) => (
              <div
                key={index}
                className="flex flex-col items-center bg-white p-4 border rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:bg-gray-100 hover:shadow-xl hover:glow-effect"
              >
                {/* Display the kernel image */}
                <img
                  src={kernel.image}
                  alt={kernel.kernelName}
                  className="w-52 h-52 object-cover mb-4 rounded-lg cursor-pointer"
                  onClick={() => handleImageClick(kernel.image)} // Handle image click
                />
                {/* Display the kernel name */}
                <h3 className="text-lg font-bold text-black">{kernel.kernelName}</h3>
                <p className="text-sm text-gray-500 mt-2">
                  Layers Applied: {kernel.layersApplied}
                </p>
                <p className="text-sm text-gray-500">
                  Multiple Layers: {kernel.isMultipleLayers ? 'Yes' : 'No'}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No kernel details available.</p>
        )}
      </div>
    </>
  );
}

export default Info;
