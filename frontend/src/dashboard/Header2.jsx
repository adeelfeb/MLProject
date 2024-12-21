import React from "react";  
import { BsChatLeftText } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom"; // Import useLocation to track current route

const Header = ({ inputText, currentModel = "💎 CNN" }) => {
  const location = useLocation(); // Use location hook to get current route

  // Redux selector for current PDF (file name)
  const fileName = useSelector((state) => state.file?.currentFileData?.fileName || "No file in chat yet");

  // Function to truncate text
  const truncateText = (text, maxLength = 15) => {
    if (!text) return "";
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  // Dynamically set inputText based on current page
  const getDynamicText = () => {
    if (location.pathname.includes("info")) {
      return "Information";  // For "Information" page
    } else if (location.pathname.includes("history")) {
      return "History"; // For "History" page
    }
    return "No Input"; // Default text
  };

  return (
    <div className="sticky top-0 flex items-center justify-between p-2 pb-3 bg-[#fff4f4] border-b border-gray-300">
      {/* Input Text Section */}
      <div className="flex-1 text-gray-800 font-medium truncate max-w-[40%]">
        {inputText || getDynamicText() ? (
          <div className="flex items-center space-x-2 bg-pink-100 text-purple-600 font-medium px-3 rounded-full max-w-[30%]">
            <span className="text-purple-500">
              <BsChatLeftText />
            </span>
            <span className="truncate">{truncateText(inputText || getDynamicText())}</span>
          </div>
        ) : (
          <span className="text-gray-500 italic">No Input</span>
        )}
      </div>

      {/* Current PDF Section */}
      <div className="flex-1 text-gray-800 font-medium text-center truncate">
        <span className="text-blue-600">{truncateText(fileName)}</span>
      </div>

      {/* Current Model Section */}
      <div className="flex-1 text-gray-800 font-medium text-right truncate">
        {currentModel ? (
          <span className="text-green-600">{truncateText(currentModel)}</span>
        ) : (
          <span className="text-gray-500 italic">No Model</span>
        )}
      </div>
    </div>
  );
};

export default Header;
