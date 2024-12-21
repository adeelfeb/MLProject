// import React, { useState, useRef, useEffect } from "react";
// import { FaFileUpload } from "react-icons/fa";
// import uploadService from "../../AserverAuth/serviceUpload";
// import ToastNotification from "../toastNotification/ToastNotification";
// import { useDispatch } from "react-redux";  // Import useDispatch
// import { setCurrentFileData } from "../../store/fileSlice";

// function Upload() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [toastMessage, setToastMessage] = useState(null);
//   const [isError, setIsError] = useState(false);
  

//   const dispatch = useDispatch();  // Initialize dispatch

//   const onError = (err) => {
//     setIsLoading(false);
//     setIsError(true);
//     setToastMessage("Error uploading file. Please try again.");
//     console.error("Upload Error:", err);
//   };

//   const onSuccess = (res) => {
//     if (!res || !res.fileUrl) {
//       onError(new Error("File URL is missing from the response."));
//       return;
//     }

//     // Dispatch the action to set the current file data in Redux
//     dispatch(setCurrentFileData({
//       fileId: res.fileId,
//       fileUrl: res.fileUrl,
//       fileName: res.fileName,  // Use the original file name
//     }));

//     // Handle successful upload response
//     setIsLoading(false);
//     setToastMessage("File uploaded successfully!");
//     setIsError(false);
//   };

//   const handleFileChange = async (event) => {
//     const file = event.target.files[0];
//     if (!file) {
//       setIsError(true);
//       setToastMessage("No file selected.");
//       return;
//     }


//     // Set loading state and prepare the UI
//     setIsLoading(true);
//     setToastMessage(null); // Reset toast message when starting a new upload

//     try {
//       // Upload the file and handle response
//       const res = await uploadService.uploadImage(file);
//       onSuccess(res);
//     } catch (err) {
//       onError(err);
//     }
//   };

//   // Reset toastMessage after a brief timeout to allow for new messages
//   useEffect(() => {
//     if (toastMessage) {
//       const timer = setTimeout(() => {
//         setToastMessage(null);
//       }, 3000); // Reset the message after 3 seconds

//       return () => clearTimeout(timer); // Clean up the timer
//     }
//   }, [toastMessage]);

//   return (
//     <div>
//       {toastMessage && (
//         <ToastNotification
//           message={toastMessage}
//           duration={3000}
//           isSuccess={!isError}
//         />
//       )}
//       {isLoading ? (
//         <div className="text-black px-2 flex flex-row">Uploading, please wait...</div>
//       ) : (
//         <div className="flex flex-row items-center">
//           <label className="cursor-pointer flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full hover:bg-gray-300">
//             <FaFileUpload className="w-6 h-6 text-black" />
//             <input
//               type="file"
//               onChange={handleFileChange}
//               className="hidden"
//             />
//           </label>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Upload;



import React, { useState, useEffect } from "react";
import { FaFileUpload } from "react-icons/fa";
import uploadService from "../../AserverAuth/serviceUpload";
import ToastNotification from "../toastNotification/ToastNotification";
import { useDispatch } from "react-redux";
import { setCurrentFileData } from "../../store/fileSlice";

function Upload() {
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [isError, setIsError] = useState(false);
  const [selectedLayer, setSelectedLayer] = useState(1); // Track selected layer
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // To manage dropdown state

  const dispatch = useDispatch();

  const onError = (err) => {
    setIsLoading(false);
    setIsError(true);
    setToastMessage("Error uploading file. Please try again.");
    console.error("Upload Error:", err);
  };

  const onSuccess = (res) => {
    if (!res || !res.fileUrl) {
      onError(new Error("File URL is missing from the response."));
      return;
    }

    // Dispatch the action to set the current file data in Redux
    dispatch(setCurrentFileData({
      fileId: res.fileId,
      fileUrl: res.fileUrl,
      fileName: res.fileName,  // Use the original file name
    }));

    // Handle successful upload response
    setIsLoading(false);
    setToastMessage("File uploaded successfully!");
    setIsError(false);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      setIsError(true);
      setToastMessage("No file selected.");
      return;
    }

    // Set loading state and prepare the UI
    setIsLoading(true);
    setToastMessage(null); // Reset toast message when starting a new upload

    try {
      // Upload the file with selected layer
      const layers = selectedLayer
      const res = await uploadService.uploadImage(file, layers);
      onSuccess(res);
    } catch (err) {
      onError(err);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev); // Toggle the dropdown state
  };

  const handleLayerSelect = (layer) => {
    setSelectedLayer(layer);
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  // Reset toastMessage after a brief timeout to allow for new messages
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 3000); // Reset the message after 3 seconds

      return () => clearTimeout(timer); // Clean up the timer
    }
  }, [toastMessage]);

  return (
    <div>
      {toastMessage && (
        <ToastNotification
          message={toastMessage}
          duration={3000}
          isSuccess={!isError}
        />
      )}
      {isLoading ? (
        <div className="text-black px-2 flex flex-row">Uploading, please wait...</div>
      ) : (
        <div className="flex flex-col items-center">
          {/* Fancy, smaller dropdown for layer selection */}
          <div className="relative mb-4">
            <div
              onClick={toggleDropdown}
              className="cursor-pointer w-20 h-8 bg-gray-200 rounded-md flex items-center justify-center text-lg font-semibold text-gray-700 hover:bg-gray-300 transition-all duration-200"
            >
              Layer {selectedLayer} {/* Display currently selected layer */}
            </div>
            {isDropdownOpen && (
              <div className="absolute top-10 left-0 w-20 bg-gray-100 text-black shadow-xl rounded-md mt-1 z-10 transition-all duration-200 ease-in-out opacity-100">
                {[1, 2, 3].map((layer) => (
                  <div
                    key={layer}
                    onClick={() => handleLayerSelect(layer)}
                    className={`px-4 py-1 cursor-pointer text-sm font-medium ${
                      selectedLayer === layer ? "bg-blue-500 text-white" : "hover:bg-gray-100"
                    }`}
                  >
                    Layer {layer}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* File upload button */}
          <label className="cursor-pointer flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full hover:bg-gray-300">
            <FaFileUpload className="w-6 h-6 text-black" />
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>
      )}
    </div>
  );
}

export default Upload;
