import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { FileData } from "../models/filedata.model.js";
import { User } from "../models/user.model.js";

import { ObjectId } from 'mongodb'; // Import ObjectId if needed

const postImageDetails = asyncHandler(async (req, res) => {
  // Check if the user is authenticated and available from `req.user`
  const data = req.data;

  
  // Respond with the fileData array for the user
  res.status(200).json(new ApiResponse(200, data, "File data recieved successfully"));
});


export{
    postImageDetails
}