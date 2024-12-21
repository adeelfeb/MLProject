import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { FileData } from "../models/filedata.model.js";
import { User } from "../models/user.model.js";

import { ObjectId } from 'mongodb'; // Import ObjectId if needed

const getImageHistory = asyncHandler(async (req, res) => {
  // Check if the user is authenticated and available from `req.user`
  const userId = req.user._id;

  if (!userId) {
    throw new ApiError(401, "Unauthorized: User ID is missing");
  }

  // Convert userId to ObjectId if it's a string
  const userObjectId = new ObjectId(userId);

  // Retrieve the user document using the ObjectId and populate fileData
  const user = await User.findOne({ _id: userObjectId }).populate('fileData');

  if (!user) {
    throw new ApiError(404, "No chat history found for this user");
  }

  // Respond with the fileData array for the user
  res.status(200).json(new ApiResponse(200, user.fileData, "File data retrieved successfully"));
});



const getImageDetails = asyncHandler(async (req, res) => {
  // Get the fileId from the request body
  const fileId = req.body.fileId;

  // Check if the fileId is provided
  if (!fileId) {
    throw new ApiError(400, "File ID is required");
  }

  // Retrieve the file data by fileId
  const fileData = await FileData.findById(fileId);

  // Check if fileData exists for the given fileId
  if (!fileData) {
    throw new ApiError(404, "File not found");
  }

  // Respond with the processedImages array and other file details
  res.status(200).json(new ApiResponse(200, fileData.processedImages, "File data retrieved successfully"));
});

export { getImageHistory, 
  getImageDetails
 };
