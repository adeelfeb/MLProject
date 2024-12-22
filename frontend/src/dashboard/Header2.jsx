// import React from "react";  
// import { BsChatLeftText } from "react-icons/bs";
// import { useSelector, useDispatch } from "react-redux"; // Import useDispatch
// import { useLocation } from "react-router-dom"; // Import useLocation to track current route
// import { setCurrentFileData } from "../store/fileSlice"; // Import your Redux action
// import { MdDiamond } from "react-icons/md"; // Diamond icon for default state

// const Header = ({ inputText, currentModel = "💎 CNN" }) => {
//   const location = useLocation(); // Use location hook to get current route
//   const dispatch = useDispatch(); // Use dispatch for Redux actions

//   // Redux selector for current PDF (file name)
//   const fileName = useSelector(
//     (state) => state.file?.currentFileData?.fileName || "No file Selected"
//   );
//   const detailedFiles = useSelector(
//     (state) => state.file?.currentImageDetails || []
//   );

//   // Function to truncate text
//   const truncateText = (text, maxLength = 16) => {
//     if (!text) return "";
//     return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
//   };

//   // Dynamically set inputText based on current page
//   const getDynamicText = () => {
//     if (location.pathname.includes("info")) {
//       return "Information"; // For "Information" page
//     } else if (location.pathname.includes("history")) {
//       return "History"; // For "History" page
//     }
//     return "Dashboard"; // Default text
//   };

//   // Handle dropdown selection
//   const handleKernelSelection = (kernel) => {
//     // Extract the current file name from Redux
//     const currentFileName = fileName; // Current fileName from Redux
//     const baseFileName = currentFileName.split(" - ")[0]; // Ensure only the base name is used
  
//     // Create the new file name with the kernel appended
//     const updatedFileName = `${baseFileName} - ${kernel.kernelName}`;
  
//     // Dispatch the updated file data to Redux
//     dispatch(
//       setCurrentFileData({
//         fileName: updatedFileName, // Updated file name with kernel
//         fileUrl: kernel.image, // Updated file URL from kernel
//       })
//     );
//   };

//   return (
//     <div className="sticky top-0 flex items-center justify-between p-2.5 bg-[#fff4f4] border-b border-gray-300">
//       {/* Input Text Section */}
//       <div className="flex-1 text-gray-800 font-medium truncate max-w-[40%]">
//         {inputText || getDynamicText() ? (
//           <div className="flex items-center space-x-2 bg-pink-100 text-purple-600 font-medium px-3 rounded-full max-w-[30%]">
//             <span className="text-purple-500">
//               <BsChatLeftText />
//             </span>
//             <span className="truncate">
//               {truncateText(inputText || getDynamicText())}
//             </span>
//           </div>
//         ) : (
//           <span className="text-gray-500 italic">Enter Input</span>
//         )}
//       </div>

//       {/* Current PDF Section */}
//       <div className="flex-1 text-gray-800 font-medium text-center truncate">
//         {fileName !== "No file Selected" ? (
//           <span className="text-blue-600">{truncateText(fileName)}</span>
//         ) : (
//           <span className="flex-1 text-blue-600 flex items-center space-x-2">
//             <MdDiamond size={20} />
//             <span>CNN</span>
//           </span>
//         )}
//       </div>

//       {/* Dropdown Menu for Kernels (only if a file is selected) */}
//       {fileName !== "No file Selected" && (
//         <div className="flex-1 text-gray-800 font-medium text-right relative">
//           <select
//             className="p-.5 text-sm border border-gray-300 rounded-xl text-gray-800 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ease-in-out"
//             onChange={(e) => {
//               const selectedKernel = detailedFiles.find(
//                 (kernel) => kernel.kernelName === e.target.value
//               );
//               if (selectedKernel) {
//                 handleKernelSelection(selectedKernel);
//               }
//             }}
//           >
//             <option value="" className="p-.5 text-sm rounded-lg">Select Kernel</option>
//             {detailedFiles.map((kernel) => (
//               <option key={kernel._id} value={kernel.kernelName}>
//                 {kernel.kernelName}
//               </option>
//             ))}
//           </select>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Header;




import React from "react";  
import { BsChatLeftText } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux"; // Import useDispatch
import { useLocation } from "react-router-dom"; // Import useLocation to track current route
import { setCurrentFileData } from "../store/fileSlice"; // Import your Redux action
import { MdDiamond } from "react-icons/md"; // Diamond icon for default state

const Header = ({ inputText, currentModel = "💎 CNN" }) => {
  const location = useLocation(); // Use location hook to get current route
  const dispatch = useDispatch(); // Use dispatch for Redux actions

  // Redux selector for current PDF (file name)
  const fileName = useSelector(
    (state) => state.file?.currentFileData?.fileName || "No file Selected"
  );
  const detailedFiles = useSelector(
    (state) => state.file?.currentImageDetails || []
  );

  // Function to truncate text
  const truncateText = (text, maxLength = 16) => {
    if (!text) return "";
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  // Dynamically set inputText based on current page
  const getDynamicText = () => {
    if (location.pathname.includes("info")) {
      return "Information"; // For "Information" page
    } else if (location.pathname.includes("history")) {
      return "History"; // For "History" page
    }
    return "Dashboard"; // Default text
  };

  // Handle dropdown selection
  const handleKernelSelection = (kernel) => {
    // Extract the current file name from Redux
    const currentFileName = fileName; // Current fileName from Redux
    const baseFileName = currentFileName.split(" - ")[0]; // Ensure only the base name is used
  
    // Create the new file name with the kernel appended
    const updatedFileName = `${baseFileName} - ${kernel.kernelName}`;
  
    // Dispatch the updated file data to Redux
    dispatch(
      setCurrentFileData({
        fileName: updatedFileName, // Updated file name with kernel
        fileUrl: kernel.image, // Updated file URL from kernel
      })
    );
  };

  return (
    <div className="sticky top-0 flex items-center justify-between p-2.5 bg-[#fff4f4] border-b border-gray-300">
      {/* Input Text Section */}
      <div className="flex-1 text-gray-800 font-medium truncate max-w-[40%]">
        {inputText || getDynamicText() ? (
          <div className="flex items-center space-x-2 bg-pink-100 text-purple-600 font-medium px-3 rounded-full max-w-[30%]">
            <span className="text-purple-500">
              <BsChatLeftText />
            </span>
            <span className="truncate">
              {truncateText(inputText || getDynamicText())}
            </span>
          </div>
        ) : (
          <span className="text-gray-500 italic">Enter Input</span>
        )}
      </div>

      {/* Current PDF Section */}
      <div className="flex-1 text-gray-800 font-medium text-center truncate">
        <span className="text-blue-600">{truncateText(fileName)}</span>
      </div>

      {/* Right-most Section (Kernel Select or No file Selected) */}
      <div className="flex-1 text-gray-800 font-medium text-right relative">
        {fileName !== "No file Selected" ? (
          <select
            className="p-.5 text-sm border border-gray-300 rounded-xl text-gray-800 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ease-in-out"
            onChange={(e) => {
              const selectedKernel = detailedFiles.find(
                (kernel) => kernel.kernelName === e.target.value
              );
              if (selectedKernel) {
                handleKernelSelection(selectedKernel);
              }
            }}
          >
            <option value="" className="p-.5 text-sm rounded-lg">Select Kernel</option>
            {detailedFiles.map((kernel) => (
              <option key={kernel._id} value={kernel.kernelName}>
                {kernel.kernelName}
              </option>
            ))}
          </select>
        ) : (
          <span className="flex  items-center space-x-2 text-blue-600">
            <MdDiamond size={20} />
            <span>CNN</span>
          </span>
        )}
      </div>
    </div>
  );
};

export default Header;
